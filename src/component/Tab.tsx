import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';

const Tab = ({ id, label, right, top, children, removeTab, minimizeTab, zIndex, active, minimized, onFocus, onMove }: TabProps) => {
    const windowRef = useRef<HTMLElement | null>(null);
    const dragOrigin = useRef<{ pointerId: number; x: number; y: number; right: number; top: number } | null>(null);
    const [dragging, setDragging] = useState(false);

    const moveWindow = (event: PointerEvent<HTMLButtonElement>) => {
        const origin = dragOrigin.current;
        if (!origin || origin.pointerId !== event.pointerId) return;
        onMove(origin.right - (event.clientX - origin.x), origin.top + event.clientY - origin.y);
    };

    const endDrag = (event: PointerEvent<HTMLButtonElement>) => {
        if (dragOrigin.current?.pointerId !== event.pointerId) return;
        dragOrigin.current = null;
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    useEffect(() => {
        if (active && !minimized && !windowRef.current?.contains(document.activeElement)) {
            windowRef.current?.focus({ preventScroll: true });
        }
    }, [active, minimized]);

    return (
        <section
            ref={windowRef}
            aria-label={`${label} window`}
            tabIndex={-1}
            hidden={minimized}
            className="desktop-window text-black dark:text-stone-300"
            data-active={active}
            data-dragging={dragging}
            style={{ right, top, zIndex }}
            onPointerDownCapture={onFocus}
            onFocusCapture={onFocus}
        >
            <div className="desktop-window-bar bg-gray-300 dark:bg-gray-700 dark:border-slate-950">
                <button
                    type="button"
                    aria-label={`Close ${label}`}
                    className="window-control window-close dark:border-slate-950"
                    onClick={() => removeTab(id)}
                >×</button>
                <button
                    type="button"
                    className="window-title font-bold font-code"
                    aria-label={`Move ${label} window`}
                    aria-describedby="window-move-help"
                    onPointerDown={event => {
                        if (event.button !== 0 || !event.isPrimary) return;
                        event.preventDefault();
                        event.currentTarget.focus({ preventScroll: true });
                        dragOrigin.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, right, top };
                        event.currentTarget.setPointerCapture(event.pointerId);
                        setDragging(true);
                    }}
                    onPointerMove={moveWindow}
                    onPointerUp={event => { moveWindow(event); endDrag(event); }}
                    onPointerCancel={endDrag}
                    onLostPointerCapture={endDrag}
                    onKeyDown={event => {
                        const step = event.shiftKey ? 40 : 10;
                        const moves: Record<string, [number, number]> = {
                            ArrowLeft: [step, 0], ArrowRight: [-step, 0],
                            ArrowUp: [0, -step], ArrowDown: [0, step],
                        };
                        const delta = moves[event.key];
                        if (!delta) return;
                        event.preventDefault();
                        onMove(right + delta[0], top + delta[1]);
                    }}
                >{label}</button>
                <button
                    type="button"
                    aria-label={`Minimize ${label}`}
                    className="window-control window-minimize dark:border-slate-950"
                    onClick={() => minimizeTab(id)}
                >−</button>
            </div>
            <div className="desktop-window-content solid-black-border rounded-b-xl dark:border-slate-950">
                {children}
            </div>
        </section>
    );
};

interface TabProps {
    id: string;
    label: string;
    right: number;
    top: number;
    children: ReactNode;
    removeTab: (id: string) => void;
    minimizeTab: (id: string) => void;
    onFocus: () => void;
    onMove: (right: number, top: number) => void;
    active: boolean;
    minimized?: boolean;
    zIndex?: number;
}

export default Tab;
