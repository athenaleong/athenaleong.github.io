import { useEffect, useRef, type ReactNode } from 'react';
import useWindowDrag from '../lib/useWindowDrag';

const Tab = ({ id, label, right, top, children, removeTab, zIndex, active, minimized, onFocus, onMove }: TabProps) => {
    const windowRef = useRef<HTMLElement | null>(null);
    const { dragging, dragHandlers } = useWindowDrag(-right, top, (x, y) => onMove(-x, y));

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
                    {...dragHandlers}
                >{label}</button>
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
    onFocus: () => void;
    onMove: (right: number, top: number) => void;
    active: boolean;
    minimized?: boolean;
    zIndex?: number;
}

export default Tab;
