import { useEffect, useId, useRef, useState } from 'react';
import { music } from '../content/music';
import { loadSpotifyEmbed, spotifyPlaylist, SpotifyEmbedController } from '../lib/spotifyEmbed';
import './RecordPlayer.css';

export default function RecordPlayer({ onClose, onFocus, front }: { onClose: () => void; onFocus: () => void; front: boolean }) {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [playing, setPlaying] = useState(false);
    const [playbackIntent, setPlaybackIntent] = useState<boolean | null>(null);
    const [attempt, setAttempt] = useState(0);
    const host = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<SpotifyEmbedController | null>(null);
    const playWhenReady = useRef(false);
    const headingId = useId();
    const playlist = spotifyPlaylist(music.playlistUrl);
    const uri = playlist?.uri;
    const engaged = playbackIntent ?? playing;

    useEffect(() => {
        if (status !== 'ready' || playbackIntent === null) return;
        // Fall back to Spotify's actual state if playback is blocked or stalls.
        const timeout = window.setTimeout(() => setPlaybackIntent(null), 8000);
        return () => window.clearTimeout(timeout);
    }, [playbackIntent, status]);

    useEffect(() => {
        if (!open || !uri || !host.current) return;
        const container = host.current;
        let cancelled = false;
        let controller: SpotifyEmbedController | undefined;
        setStatus('loading');
        setPlaying(false);
        const fail = () => {
            if (cancelled) return;
            cancelled = true;
            window.clearTimeout(timeout);
            controller?.destroy();
            controllerRef.current = null;
            playWhenReady.current = false;
            container.replaceChildren();
            setPlaying(false);
            setPlaybackIntent(null);
            setStatus('error');
        };
        const timeout = window.setTimeout(fail, 18000);
        loadSpotifyEmbed().then(api => {
            if (cancelled) return;
            const mount = document.createElement('div');
            container.append(mount);
            api.createController(mount, { uri, width: '100%', height: 80 }, embed => {
                if (cancelled) { embed.destroy(); return; }
                controller = embed;
                controllerRef.current = embed;
                const iframe = container.querySelector('iframe');
                if (iframe) iframe.title = `${music.title} on Spotify`;
                embed.addListener('ready', () => {
                    if (cancelled) return;
                    window.clearTimeout(timeout);
                    setStatus('ready');
                    if (playWhenReady.current) {
                        playWhenReady.current = false;
                        embed.play();
                    }
                });
                embed.addListener('playback_update', event => {
                    if (cancelled || event.data.isBuffering) return;
                    const isPlaying = !event.data.isPaused;
                    setPlaying(isPlaying);
                    // Ignore stale startup events until Spotify acknowledges the click.
                    setPlaybackIntent(intent => intent === isPlaying ? null : intent);
                });
            });
        }).catch(fail);
        return () => {
            cancelled = true;
            window.clearTimeout(timeout);
            controller?.destroy();
            controllerRef.current = null;
            container.replaceChildren();
        };
    }, [open, uri, attempt]);

    const togglePlayback = () => {
        const nextPlaying = !engaged;
        setPlaybackIntent(nextPlaying);
        if (open && status === 'ready' && controllerRef.current) {
            if (nextPlaying) controllerRef.current.resume();
            else controllerRef.current.pause();
        } else {
            playWhenReady.current = nextPlaying;
            if (status === 'error') setAttempt(value => value + 1);
            setOpen(true);
        }
    };

    return (
        <aside id="record-player" className="record-player" aria-labelledby={headingId} data-playing={playing} data-engaged={engaged} data-front={front} onPointerDownCapture={onFocus} onFocusCapture={onFocus}>
            <div className="record-player-heading">
                <button className="record-player-close window-control window-close" type="button" aria-label="Close record player" onClick={onClose}>×</button>
                <h2 id={headingId}>{music.title}</h2>
                <span className="record-player-light" aria-hidden="true" />
            </div>
            <div className="record-player-body">
            <button className="record-player-deck" type="button" aria-label={engaged ? 'Pause music' : 'Play music'} title={engaged ? 'Pause music' : 'Play music'} disabled={!playlist} onClick={togglePlayback} aria-busy={open && status === 'loading'}>
                <svg viewBox="0 0 288 200" className="record-player-turntable" aria-hidden="true">
                    <circle cx="16" cy="16" r="3" fill="currentColor" />
                    <circle cx="272" cy="16" r="3" fill="currentColor" />
                    <circle cx="16" cy="184" r="3" fill="currentColor" />
                    <circle cx="272" cy="184" r="3" fill="currentColor" />
                    <circle cx="108" cy="102" r="87" fill="#9ca3af" stroke="#161616" strokeWidth="3" />
                    <g className="record-player-vinyl">
                        <circle cx="108" cy="102" r="81" fill="#222" stroke="#161616" strokeWidth="3" />
                        {[73, 65, 57, 49, 41].map(radius => <circle key={radius} cx="108" cy="102" r={radius} fill="none" stroke="#484848" strokeWidth="1" />)}
                        <path d="M 56 48 A 75 75 0 0 1 145 36 M 69 168 A 75 75 0 0 0 167 147" fill="none" stroke="#747474" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="108" cy="102" r="31" fill="#ffcb2f" stroke="#161616" strokeWidth="3" />
                        <path d="M 88 86 Q 108 76 128 86 M 92 120 Q 108 127 124 120" fill="none" stroke="#161616" strokeWidth="2" />
                    </g>
                    <circle cx="108" cy="102" r="5" fill="#eeeae0" stroke="#161616" strokeWidth="2" />
                    <rect x="231" y="111" width="16" height="9" rx="3" fill="#c9c7bd" stroke="#161616" strokeWidth="2" />
                    <g transform="translate(239 48)">
                        <g className="record-player-arm">
                            <rect x="-10" y="-31" width="20" height="27" rx="4" fill="#777" stroke="#161616" strokeWidth="3" />
                            <path d="M 0 0 L 0 84 L -16 105" fill="none" stroke="#161616" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M 0 0 L 0 84 L -16 105" fill="none" stroke="#f8f5e9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M -21 95 L -8 104 L -21 124 L -34 115 Z" fill="#fd675e" stroke="#161616" strokeWidth="3" strokeLinejoin="round" />
                        </g>
                        <circle r="13" fill="#f8f5e9" stroke="#161616" strokeWidth="3" />
                        <circle r="4" fill="#161616" />
                    </g>
                    <circle cx="250" cy="166" r="14" fill="#ffcb2f" stroke="#161616" strokeWidth="2" />
                    {engaged ? (
                        <path d="M 245 160 V 172 M 254 160 V 172" stroke="#161616" strokeWidth="4" />
                    ) : (
                        <path d="M 246 158 L 257 166 L 246 174 Z" fill="#161616" />
                    )}
                </svg>
            </button>
            <div className="record-player-controls">
                {open && playlist && (
                    <div className="record-player-panel">
                        <p className="sr-only" role="status">{status === 'loading' ? 'Loading music' : status === 'error' ? 'Spotify couldn’t load.' : playing ? 'Playing' : 'Paused'}</p>
                        <div className="record-player-embed" ref={host} />
                        {status === 'error' && <button className="record-player-retry" type="button" onClick={() => setAttempt(value => value + 1)}>Try again</button>}
                        <a className="record-player-link" href={playlist.url} target="_blank" rel="noopener noreferrer">Open playlist in Spotify <span aria-hidden="true">↗</span></a>
                    </div>
                )}
            </div>
            </div>
        </aside>
    );
}
