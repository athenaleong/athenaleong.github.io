import { useDrag } from 'react-dnd';
import { useEffect, useRef, type ReactNode } from 'react';
import { Preview } from 'react-dnd-preview';

const Tab = ({ id, label, right, top, children, removeTab, minimizeTab, zIndex, active, minimized, onFocus, onMove, isTouchDevice }: TabProps) => {
    const windowRef = useRef<HTMLElement | null>(null);
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'tab',
        item: () => {
            onFocus();
            return { id, right, top, type: 'tab' };
        },
        collect: monitor => ({ isDragging: monitor.isDragging() }),
    }), [id, right, top, onFocus]);

    useEffect(() => {
        if (active && !minimized && !windowRef.current?.contains(document.activeElement)) {
            windowRef.current?.focus({ preventScroll: true });
        }
    }, [active, minimized]);

    return (
        <>
            <section
                ref={node => { windowRef.current = node; preview(node); }}
                aria-label={`${label} window`}
                tabIndex={-1}
                hidden={minimized}
                className="desktop-window text-black dark:text-stone-300"
                data-active={active}
                style={{ right, top, zIndex, opacity: isDragging ? 0 : 1 }}
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
                        ref={drag}
                        type="button"
                        className="window-title font-bold font-code"
                        aria-label={`Move ${label} window`}
                        aria-describedby="window-move-help"
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
            {isTouchDevice && <Preview generator={({ item, style }: any) => item.id === id ? (
                <div style={style} className="pointer-events-none bg-figma-yellow solid-black-border rounded-lg p-3 font-code font-bold" aria-hidden="true">
                    {label}
                </div>
            ) : <></>} />}
        </>
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
    isTouchDevice: boolean;
    active: boolean;
    minimized?: boolean;
    zIndex?: number;
}

export default Tab;
