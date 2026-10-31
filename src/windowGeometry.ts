// Keep these dimensions in sync with .desktop-window in index.css.
export function clampWindowPosition(right: number, top: number, width: number, height: number) {
    const windowWidth = Math.min(800, width - 32);
    const windowHeight = Math.min(600, height - 192);
    return {
        right: Math.max(16, Math.min(right, width - windowWidth - 16)),
        top: Math.max(16, Math.min(top, height - windowHeight - 96)),
    };
}

export function initialWindowPosition(index: number, width: number, height: number) {
    const windowWidth = Math.min(800, width - 32);
    return clampWindowPosition(width - windowWidth - 32 - index * 32, 32 + index * 32, width, height);
}

export function clampFloatingWindowPosition(left: number, top: number, width: number, height: number, windowWidth: number, windowHeight: number) {
    return {
        left: Math.max(16, Math.min(left, width - windowWidth - 16)),
        top: Math.max(16, Math.min(top, height - windowHeight - 96)),
    };
}
