import React, { Component, useState, useCallback, useLayoutEffect, useEffect } from 'react';
import update from 'immutability-helper';
import { useDrop, DropTargetMonitor } from 'react-dnd'
import Folder from '../component/Folder';

//components
import Tab from '../component/Tab';
import AboutTab from './AboutTab';
import ProjectTab from './ProjectTab';
import WhatTab from './WhatTab';
import Clock from '../component/Clock';
import DockerWrapper from '../component/DockerWrapper';
import ConnectTheDots from '../component/ConnectTheDot';
import ThemeToggle from '../component/ThemeToggle';

//type
import DesktopTabDict, { DesktopTabType } from '../type/tab';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import tab, { popTab, addTab, updateTab, bringTabToFront, clearTab } from '../slices/tab';


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
    const tabs = useSelector<RootState, DesktopTabDict>((state) => state.tab.tabs);

    /** Drag and Drop */

    const moveItems = useCallback(
    (id: string, right: number, top: number, type: 'folder'| 'tab') => {
        switch (type) {
            case 'folder': 
                setFolders(update(folders, {
                    [id]: {
                    $merge: { right, top },
                    },
                }));
                break;
            case 'tab':
                dispatch(updateTab({id, props: {right, top}}))
                break;
        }
        ;
    },
    [folders, setFolders, tabs],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ['folder', 'tab'],
            drop(item: any, monitor: any) {
                // console.log(item);
                const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number }
                // console.log(item.right, item.top, delta.x, delta.y)
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
            let defaultProps = DefaultDesktopTabDict[tabId];
            dispatch(addTab({id: tabId, props: defaultProps}))
        }
    }, [dispatch])

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
            {/* livvic vs hanken */}
            <div className='w-screen h-10 bg-figma-yellow flex flex-row justify-between border-black border-[4px] border-b-0 items-center text-lg font-bold font-code dark:bg-figma-blue dark:border-slate-950'> 
                <div className='flex flex-row space-x-4 pl-6 items-center'>
                    <img src={'/slide.png'} className='w-10'/>
                    <p>AthenaOS  </p>
                   

                    {/* <div className='flex flex-row'> 
                        
                    </div> */}
                </div>
                <div className='pr-6 flex flex-row space-x-4 items-center'>

                    <a href="mailto:athenaleong619&#64;gmail&#46;com">
                    <img src={'/mail.png'} className='w-5 h-5'/>
                    </a>   
                    <a href="https://github.com/athenaleong" target="_blank">
                        <img src={'/github.png'} className='w-5 h-5'/>
                    </a>
                    <a href="https://twitter.com/thenabanana" target="_blank">
                        <img src={'/twitter.png'} className='w-5 h-5'/>
                    </a>
                    {/* <img src="/location.png" className='w-5 h-5'/> */}
                <ThemeToggle />

                    <p> Berkeley, CA</p>
                    <Clock />
                  
                </div>
            </div>
            <div ref={drop} className='w-screen shrink h-screen relative flex flex-col justify-end items-center solid-black-border dark:border-slate-950'>
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
                            hoverImageSrc={hoverImageSrc}
                            isTouchDevice={isTouchDevice}
                        />)
                })}
                {Object.keys(tabs).map((key) => {
                    const { right, top, zIndex } = tabs[key] as {
                        top: number
                        right: number
                        zIndex?: number
                    }
                    return(
                        <Tab key={key} id={key} right={right} top={top} removeTab={removeTab} zIndex={zIndex} onClick={() => dispatch(bringTabToFront({id: key}))} isTouchDevice={isTouchDevice}>
                            {TabRender(key)}
                        </Tab>
                    )
                })}
                <ConnectTheDots/>
                <div className="fixed bottom-2 w-fit h-14 bg-figma-blue m-10 flex flex-row justify-center space-x-10 px-14 z-max solid-black-border rounded-xl dark:bg-figma-yellow dark:border-slate-950">
                    <DockerWrapper>
                    <div 
                        className='w-16 h-16 bg-red-300 solid-black-border rounded-xl dark:border-slate-950'
                        onClick={resetOnClick}
                        style={{backgroundImage: `url('/clear.png')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                    >
                    </div>
                    </DockerWrapper>   

                </div>
            </div>
        </div>
    );
};

export default Desktop;

interface DesktopProps {
};


//TODO: move out
const DefaultDesktopTabDict: DesktopTabDict = {
    'about': {right: 400, top: 50},
    'projects': {right: 250, top: 150},
    '???': {right: 300, top: 50},
    'garden': {right: 500, top: 50},
}



