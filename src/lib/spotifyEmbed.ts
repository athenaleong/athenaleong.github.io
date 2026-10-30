export type SpotifyPlaybackEvent = {
    data: { isPaused: boolean; isBuffering: boolean };
};

export interface SpotifyEmbedController {
    addListener(event: 'ready', callback: () => void): void;
    addListener(event: 'playback_update', callback: (event: SpotifyPlaybackEvent) => void): void;
    play(): void;
    togglePlay(): void;
    destroy(): void;
}

interface SpotifyIframeApi {
    createController(
        element: HTMLElement,
        options: { uri: string; width: string; height: number },
        callback: (controller: SpotifyEmbedController) => void,
    ): void;
}

declare global {
    interface Window {
        onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
    }
}

let apiPromise: Promise<SpotifyIframeApi> | undefined;

// Load only after a visitor opens the player. Share the loader across remounts.
export function loadSpotifyEmbed(): Promise<SpotifyIframeApi> {
    if (apiPromise) return apiPromise;
    apiPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        const fail = () => {
            window.clearTimeout(timeout);
            script.remove();
            delete window.onSpotifyIframeApiReady;
            apiPromise = undefined;
            reject(new Error('Spotify could not be loaded.'));
        };
        const timeout = window.setTimeout(fail, 12000);
        script.onerror = fail;
        window.onSpotifyIframeApiReady = api => {
            window.clearTimeout(timeout);
            script.onerror = null;
            resolve(api);
        };
        document.body.append(script);
    });
    return apiPromise;
}

export function spotifyPlaylist(url: string) {
    try {
        const parsed = new URL(url);
        const match = parsed.pathname.match(/^\/(?:intl-[a-z-]+\/)?playlist\/([A-Za-z0-9]{22})\/?$/);
        if (parsed.protocol !== 'https:' || parsed.hostname !== 'open.spotify.com' || !match) return null;
        return {
            uri: `spotify:playlist:${match[1]}`,
            url: `https://open.spotify.com/playlist/${match[1]}`,
        };
    } catch {
        return null;
    }
}
