import { useState, useCallback, useLayoutEffect, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd'
import Folder from '../component/Folder';

//components
import Tab from '../component/Tab';
import AboutTab from './AboutTab';
import ProjectTab from './ProjectTab';
import WhatTab from './WhatTab';
import Clock from '../component/Clock';
import ConnectTheDots from '../component/ConnectTheDot';
import ThemeToggle from '../component/ThemeToggle';
import { tabLinks } from '../site';
import { clampWindowPosition, initialWindowPosition } from '../windowGeometry';

//type

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import { popTab, addTab, updateTab, bringTabToFront, clearTab, minimizeTab } from '../slices/tab';

const windowLabels: Record<string, string> = { about: 'About', projects: 'Projects', '???': 'My story' };
const windowIcons: Record<string, string> = { about: '/about.png', projects: '/project.png', '???': '/anglerfish.png' };


const Desktop = () => {

    const [folders, setFolders] = useState<{
        [key: string]: {
            top: number;
            right: number;
            imageSrc: string;
            tabId: string;
            hoverImageSrc?: string;
        }
    }>({
        'About': {imageSrc: '/about.png', hoverImageSrc: '/about-hover.png', right: 25, top: 25, tabId: 'about'},
        'Projects' : {imageSrc: '/project.png', hoverImageSrc: '/project-hover.png', right: 150, top: 25, tabId: 'projects'},
        '???' : {imageSrc: '/anglerfish.png', hoverImageSrc: '/anglerfish-hover.png', right: 25, top: 150, tabId: '???' },
        'Thought Garden' : {imageSrc: '/garden.png', hoverImageSrc: '/garden-hover.png', right: 25, top: 275, tabId: 'garden' },

    });

    const dispatch = useDispatch();
    const { tabs, activeId } = useSelector((state: RootState) => state.tab);
    const workspaceRef = useRef<HTMLDivElement | null>(null);
    const [workspaceSize, setWorkspaceSize] = useState({ width: 0, height: 0 });
    const lastActiveId = useRef<string | null>(null);

    useEffect(() => {
        // Return keyboard focus to the dock when the last visible window closes.
        if (!activeId && lastActiveId.current &&
            (document.activeElement === document.body || document.activeElement?.closest('[hidden]'))) {
            workspaceRef.current?.querySelector<HTMLAnchorElement>(`.desktop-dock a[href="${tabLinks[lastActiveId.current]}"]`)?.focus();
        }
        lastActiveId.current = activeId;
    }, [activeId]);

    useLayoutEffect(() => {
        const workspace = workspaceRef.current;
        if (!workspace) return;
        const observer = new ResizeObserver(() => setWorkspaceSize({ width: workspace.clientWidth, height: workspace.clientHeight }));
        observer.observe(workspace);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!workspaceSize.width) return;
        for (const [id, window] of Object.entries(tabs)) {
            const props = clampWindowPosition(window.right, window.top, workspaceSize.width, workspaceSize.height);
            if (props.right !== window.right || props.top !== window.top) dispatch(updateTab({ id, props }));
        }
    }, [workspaceSize, tabs, dispatch]);

    /** Drag and Drop */

    const moveItems = useCallback(
    (id: string, right: number, top: number, type: 'folder'| 'tab') => {
        switch (type) {
            case 'folder':
                setFolders(previous => ({ ...previous, [id]: { ...previous[id], right, top } }));
                break;
            case 'tab':
                dispatch(updateTab({id, props: clampWindowPosition(right, top, workspaceSize.width, workspaceSize.height)}))
                break;
        }
        ;
    },
    [dispatch, workspaceSize],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ['folder', 'tab'],
            drop(item: any, monitor: any) {
                const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number }
                if (!delta) return;
                let right = Math.round(item.right - delta.x)
                let top = Math.round(item.top + delta.y)
                top = Math.max(0, top)
                moveItems(item.id, right, top, item.type)
                return undefined
            },
        }),
        [moveItems],
    )

    /** Tabs logic */

    const removeTab = useCallback((id: string) => {
        dispatch(popTab({id}));
    }, [dispatch])

    const TabRender = (id: string) => {
        switch (id) {
            case 'about':
                return <AboutTab/>
            case 'projects':
                return <ProjectTab/>
            case '???':
                return <WhatTab/>
        }
    }

    const folderOnClick = useCallback((tabId: string) => {
        if (tabId == "garden") {
            window.open("https://garden.athenaleong.com", "_blank")
        }
        else if (tabId in tabs) {
            dispatch(bringTabToFront({id: tabId}))
        } else {
            dispatch(addTab({id: tabId, props: initialWindowPosition(Object.keys(tabs).length, workspaceSize.width, workspaceSize.height)}))
        }
    }, [dispatch, tabs, workspaceSize])

    const resetOnClick = useCallback(() => {
        dispatch(clearTab())
    }, [dispatch])


    /** Hack to understand which backend device until issue is fixed */
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const handleTouchStart = () => setIsTouchDevice(true);
        document.addEventListener('touchstart', handleTouchStart);
        return () => document.removeEventListener('touchstart', handleTouchStart);
    }, []);

    return (
        <div
            className="cursor-default w-full h-full flex flex-col fixed text-black dark:text-stone-300"
        >
            <h1 className="sr-only">Athena Leong's Playground</h1>
            <p id="window-move-help" className="sr-only">Drag the title bar to move a window, or focus it and use the arrow keys. Hold Shift to move farther.</p>
            {/* livvic vs hanken */}
            <div className='w-screen h-10 shrink-0 bg-figma-yellow flex flex-row justify-between border-black border-[4px] border-b-0 items-center text-lg font-bold font-code dark:bg-figma-blue dark:border-slate-950'>
                <div className='flex flex-row space-x-4 pl-6 items-center'>
                    <img src={'/slide-thick.png'} className='w-10'/>
                    <p>AthenaOS  </p>


                    {/* <div className='flex flex-row'>

                    </div> */}
                </div>
                <div className='pr-6 flex flex-row space-x-4 items-center'>
                    <a className="reading-view-link" href="/about/">Reading view</a>

                    <a href="mailto:athenaleong619&#64;gmail&#46;com">
                    <img src={'/mail.png'} className='w-5 h-5'/>
                    </a>
                    <a href="https://github.com/athenaleong" target="_blank">
                        <img src={'/github.png'} className='w-5 h-5'/>
                    </a>
                    <a href="https://x.com/athenamakes" target="_blank">
                        <img src={'/twitter.png'} className='w-5 h-5'/>
                    </a>
                    <a href="https://www.tiktok.com/@athena.makes" target="_blank">
                        <img src={'/tiktok.png'} className='w-5 h-5'/>
                    </a>
                    {/* <img src="/location.png" className='w-5 h-5'/> */}
                <ThemeToggle />

                    <p> San Francisco, CA</p>
                    <Clock />

                </div>
            </div>
            <div ref={node => { workspaceRef.current = node; drop(node); }} className='desktop-workspace w-full flex-1 min-h-0 relative flex flex-col justify-end items-center solid-black-border dark:border-slate-950'>
                {Object.keys(folders).map((key) => {
                    const { right, top, imageSrc, tabId, hoverImageSrc} = folders[key] as {
                        top: number
                        right: number
                        imageSrc: string
                        tabId: string
                        hoverImageSrc?: string
                      }
                    return(
                        <Folder
                            key={key}
                            id={key}
                            imageSrc={imageSrc}
                            right={right}
                            top={top}
                            onClick={() => folderOnClick(tabId)}
                            href={tabLinks[tabId]}
                            hoverImageSrc={hoverImageSrc}
                            isTouchDevice={isTouchDevice}
                        />)
                })}
                <div className="desktop-windows">
                {Object.keys(tabs).map((key) => {
                    const { right, top, zIndex, minimized } = tabs[key];
                    return(
                        <Tab key={key} id={key} label={windowLabels[key]} right={right} top={top} removeTab={removeTab} zIndex={zIndex} active={key === activeId} minimized={minimized} minimizeTab={id => dispatch(minimizeTab({id}))} onFocus={() => dispatch(bringTabToFront({id: key}))} onMove={(right, top) => moveItems(key, right, top, 'tab')} isTouchDevice={isTouchDevice}>
                            {TabRender(key)}
                        </Tab>
                    )
                })}
                </div>
                <ConnectTheDots/>
                <nav aria-label="Desktop dock" className="desktop-dock bg-figma-blue solid-black-border rounded-xl dark:bg-figma-yellow dark:border-slate-950">
                    {Object.keys(windowLabels).map(id => (
                        <a
                            key={id}
                            href={tabLinks[id]}
                            className="dock-launcher"
                            aria-label={windowLabels[id]}
                            aria-current={activeId === id ? 'true' : undefined}
                            data-open={Boolean(tabs[id])}
                            title={`${tabs[id]?.minimized ? 'Restore' : tabs[id] ? 'Switch to' : 'Open'} ${windowLabels[id]}`}
                            onClick={event => {
                                if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
                                event.preventDefault();
                                folderOnClick(id);
                            }}
                        >
                            <img src={windowIcons[id]} alt="" />
                            <span className="dock-dot" aria-hidden="true" />
                        </a>
                    ))}
                    <button type="button" aria-label="Close all windows" title="Close all windows" className="dock-reset" onClick={resetOnClick}>
                        <img src="/clear.png" alt="" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Desktop;
