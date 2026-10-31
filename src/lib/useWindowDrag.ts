import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export default function useWindowDrag(x: number, y: number, onMove: (x: number, y: number) => void) {
    const origin = useRef<{ pointerId: number; pointerX: number; pointerY: number; x: number; y: number } | null>(null);
    const [dragging, setDragging] = useState(false);

    const move = (event: PointerEvent<HTMLButtonElement>) => {
        const start = origin.current;
        if (!start || start.pointerId !== event.pointerId) return;
        onMove(start.x + event.clientX - start.pointerX, start.y + event.clientY - start.pointerY);
    };

    const end = (event: PointerEvent<HTMLButtonElement>) => {
        if (origin.current?.pointerId !== event.pointerId) return;
        origin.current = null;
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    return {
        dragging,
        dragHandlers: {
            onPointerDown: (event: PointerEvent<HTMLButtonElement>) => {
                if (event.button !== 0 || !event.isPrimary) return;
                event.preventDefault();
                event.currentTarget.focus({ preventScroll: true });
                origin.current = { pointerId: event.pointerId, pointerX: event.clientX, pointerY: event.clientY, x, y };
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragging(true);
            },
            onPointerMove: move,
            onPointerUp: (event: PointerEvent<HTMLButtonElement>) => { move(event); end(event); },
            onPointerCancel: end,
            onLostPointerCapture: end,
            onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => {
                const step = event.shiftKey ? 40 : 10;
                const moves: Record<string, [number, number]> = {
                    ArrowLeft: [-step, 0], ArrowRight: [step, 0],
                    ArrowUp: [0, -step], ArrowDown: [0, step],
                };
                const delta = moves[event.key];
                if (!delta) return;
                event.preventDefault();
                onMove(x + delta[0], y + delta[1]);
            },
        },
    };
}
