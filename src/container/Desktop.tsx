import React, { Component, useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useDrop, DropTargetMonitor } from 'react-dnd'
import Folder from '../component/Folder';

import Tab from '../component/Tab';
import AboutTab from './AboutTab';
import ProjectTab from './ProjectTab';
import ContactTab from './ContactTab';
import Clock from '../component/Clock';

//type
import TabDict, { TabType } from '../type/tab';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../slices';
import { popTab, addTab, updateTab, bringTabToFront, clearTab } from '../slices/tab';


const Desktop = () => {

    const [folders, setFolders] = useState<{
        [key: string]: {
            top: number;
            right: number;
            imageSrc: string;
            tabId: string;
        }
    }>({
        '1': {imageSrc: './src/assets/react.svg', right: 100, top: 100, tabId: 'about'},
        '2' : {imageSrc: './src/assets/react.svg', right: 100, top: 200, tabId: 'project'},
        '3' : {imageSrc: './src/assets/react.svg', right: 100, top: 300, tabId: 'contact' },
    });

    const dispatch = useDispatch();
    const tabs = useSelector<RootState, TabDict>((state) => state.tab.tabs);

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
                console.log(item);
                const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number }
                console.log(item.right, item.top, delta.x, delta.y)
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
            case 'project':
                return <ProjectTab/>
            case 'contact':
                return <ContactTab/>
        }
    }

    const folderOnClick = useCallback((tabId: string) => {
        if (tabId in tabs) {
            dispatch(bringTabToFront({id: tabId}))
        } else {
            let defaultProps = DefaultTabDict[tabId];
            dispatch(addTab({id: tabId, props: defaultProps}))
        }
    }, [dispatch])

    const resetOnClick = useCallback(() => {
        dispatch(clearTab())
    }, [dispatch])

    return (
        <div className="w-screen h-screen flex flex-col fixed ">
            {/* livvic vs hanken */}
            <div className='w-screen h-10 bg-green-300 flex flex-row justify-between border-black border-[4px] border-b-0 items-center text-lg font-bold font-livicc'> 
                <div className='flex flex-row space-x-4 pl-6 items-center '>
                    <img src='./src/assets/slide-thick.png' className='w-10'/>
                    <p>AthenaOS  </p>
                   

                    {/* <div className='flex flex-row'> 
                        
                    </div> */}
                </div>
                <div className='pr-6 flex flex-row space-x-4 items-center'>
                        {/* <img src="./src/assets/location.png" className='w-5 h-5'/> */}
                        <a href="https://github.com/athenaleong" target="_blank">
                        <img src='./src/assets/github.png' className='w-5 h-5'/>
                    </a>
                    <a href="https://twitter.com/thenabanana" target="_blank">
                        <img src='./src/assets/twitter.png' className='w-5 h-5'/>
                    </a>
                        <p> Berkeley, CA</p>
                  <Clock />
                  
                </div>
            </div>
            <div ref={drop} className='w-screen shrink h-screen relative flex flex-col justify-end items-center solid-border'>
                {Object.keys(folders).map((key) => {
                    const { right, top, imageSrc, tabId} = folders[key] as {
                        top: number
                        right: number
                        imageSrc: string
                        tabId: string
                      }
                    return(
                        <Folder 
                            key={key} 
                            id={key} 
                            imageSrc={imageSrc} 
                            right={right} 
                            top={top}
                            onClick={() => folderOnClick
                        (tabId)}
                        />)
                })}
                {Object.keys(tabs).map((key) => {
                    const { right, top, zIndex } = tabs[key] as {
                        top: number
                        right: number
                        zIndex?: number
                    }
                    return(
                        <Tab key={key} id={key} right={right} top={top} removeTab={removeTab} zIndex={zIndex} onClick={() => dispatch(bringTabToFront({id: key}))}>
                            {TabRender(key)}
                        </Tab>
                    )
                })}
                <div className="w-fit h-14 bg-blue-400 m-10 flex flex-row justify-center space-x-10 px-14 z-max solid-border">
                    <div 
                        className='w-16 h-16 bg-red-300 relative bottom-8 solid-border'
                        onClick={resetOnClick}
                    >
                        Reset
                    </div>
                    <div className='w-16 h-16 bg-orange-300 relative bottom-8 solid-border'>
                    </div>
                    <div className='w-16 h-16 bg-yellow-300 relative bottom-8 solid-border'>
                    </div>
                    <div className='w-16 h-16 bg-green-300 relative bottom-8 solid-border'>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Desktop;

interface DesktopProps {
};


//TODO: move out
const DefaultTabDict: TabDict = {
    'about': {right: 400, top: 50},
    'project': {right: 650, top: 150},
    'contact': {right: 300, top: 100},
}



