import { useEffect, useId, useRef, useState } from 'react';
import { music } from '../content/music';
import { loadSpotifyEmbed, spotifyPlaylist, SpotifyEmbedController } from '../lib/spotifyEmbed';
import './RecordPlayer.css';

export default function RecordPlayer() {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [playing, setPlaying] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const host = useRef<HTMLDivElement>(null);
    const headingId = useId();
    const panelId = useId();
    const playlist = spotifyPlaylist(music.playlistUrl);
    const uri = playlist?.uri;

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
            container.replaceChildren();
            setPlaying(false);
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
                const iframe = container.querySelector('iframe');
                if (iframe) iframe.title = `${music.title} on Spotify`;
                embed.addListener('ready', () => {
                    if (cancelled) return;
                    window.clearTimeout(timeout);
                    setStatus('ready');
                });
                embed.addListener('playback_update', event => {
                    if (!cancelled) setPlaying(!event.data.isPaused && !event.data.isBuffering);
                });
            });
        }).catch(fail);
        return () => {
            cancelled = true;
            window.clearTimeout(timeout);
            controller?.destroy();
            container.replaceChildren();
        };
    }, [open, uri, attempt]);

    const closePlayer = () => {
        setOpen(false);
        setPlaying(false);
    };

    return (
        <aside className="record-player" aria-labelledby={headingId} data-playing={playing}>
            <div className="record-player-heading">
                <h2 id={headingId}>{music.title}</h2>
                <span className="record-player-light" aria-hidden="true" />
            </div>
            <div className="record-player-deck" aria-hidden="true">
                <svg viewBox="0 0 288 200" className="record-player-turntable">
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
                        <text x="108" y="95" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#161616">GOOD STUFF</text>
                        <text x="108" y="115" textAnchor="middle" fontSize="7" fontFamily="monospace" fontWeight="bold" fill="#161616">SIDE A</text>
                    </g>
                    <circle cx="108" cy="102" r="5" fill="#eeeae0" stroke="#161616" strokeWidth="2" />
                    <rect x="232" y="72" width="14" height="59" rx="5" fill="#c9c7bd" stroke="#161616" strokeWidth="2" />
                    <g className="record-player-arm">
                        <rect x="229" y="17" width="20" height="27" rx="4" fill="#777" stroke="#161616" strokeWidth="3" />
                        <path d="M 239 48 L 239 132 L 223 153" fill="none" stroke="#161616" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 239 48 L 239 132 L 223 153" fill="none" stroke="#f8f5e9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 218 143 L 231 152 L 218 172 L 205 163 Z" fill="#fd675e" stroke="#161616" strokeWidth="3" strokeLinejoin="round" />
                        <circle cx="239" cy="48" r="13" fill="#f8f5e9" stroke="#161616" strokeWidth="3" />
                        <circle cx="239" cy="48" r="4" fill="#161616" />
                    </g>
                </svg>
            </div>
            <div className="record-player-strip">
                <span className="record-player-caption">a little background music</span>
                <span aria-hidden="true">33⅓</span>
            </div>
            <div className="record-player-controls">
                {playlist ? (
                    <button className="record-player-toggle" type="button" aria-expanded={open} aria-controls={panelId} onClick={() => open ? closePlayer() : setOpen(true)}>
                        <span aria-hidden="true">{open ? '−' : '♫'}</span>
                        {open ? 'Put record away' : 'Listen along'}
                    </button>
                ) : <p className="record-player-empty">Picking out a few favorites. Stay tuned.</p>}
                {open && playlist && (
                    <div id={panelId} className="record-player-panel">
                        <p className="record-player-status" role="status">
                            {status === 'loading' ? 'Tuning in…' : status === 'error' ? 'Spotify couldn’t load here.' : playing ? 'On the turntable ♫' : 'Press play below.'}
                        </p>
                        <div className="record-player-embed" ref={host} />
                        {status === 'error' && <button className="record-player-retry" type="button" onClick={() => setAttempt(value => value + 1)}>Try again</button>}
                        <a className="record-player-link" href={playlist.url} target="_blank" rel="noopener noreferrer">Open playlist in Spotify <span aria-hidden="true">↗</span></a>
                    </div>
                )}
            </div>
        </aside>
    );
}
