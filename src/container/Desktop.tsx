import React, { Component, useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useDrop, DropTargetMonitor } from 'react-dnd'
import Folder from '../component/Folder';

//TODO: move out
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import Tab from '../component/Tab';
import AboutTab from './AboutTab';
import ProjectTab from './ProjectTab';
import ContactTab from './ContactTab';

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

    const [minZIndex, setMinZIndex] = useState<number>(1);

    const [tabs, setTabs] = useState<TabType>({})

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
                setTabs(update(tabs, {
                    [id]: {
                    $merge: { right, top, zIndex: minZIndex + 1},
                    },
                }));
                setMinZIndex(minZIndex + 1)
                break;
        }
        ;
    },
    [folders, setFolders, tabs, setTabs],
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

    const removeTab = (id: string) => {
        setTabs(update(tabs, {
            $unset: [id],
        }));
    }

    //TODO: Create Interface 
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

    const FolderOnClick = (tabId: string) => {
        if (tabId in tabs) {
            setTabs(update(tabs, {
                [tabId]: {
                    $merge: { zIndex: minZIndex + 1},
                },
            }));
            setMinZIndex(minZIndex + 1)
        } else {
            let defaultProps = DefaultTabDict[tabId];
            defaultProps.zIndex = minZIndex + 1;
            setMinZIndex(minZIndex + 1);
            setTabs(update(tabs, {
                [tabId]: {
                    $set: defaultProps,
                },
            }))
        }
    }

    return (
        <div className="w-screen h-screen bg-yellow-300 flex flex-col fixed">
            <div className='w-screen h-10 bg-orange-300'>

            </div>
            <div ref={drop} className='w-screen bg-blue-300 shrink h-screen relative'>
                <h1>Desktop</h1>
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
                            onClick={() => FolderOnClick(tabId)}
                        />)
                })}
                {Object.keys(tabs).map((key) => {
                    const { right, top, zIndex } = tabs[key] as {
                        top: number
                        right: number
                        zIndex?: number
                    }
                    return(
                        <Tab key={key} id={key} right={right} top={top} removeTab={removeTab} zIndex={zIndex}>
                            {TabRender(key)}
                        </Tab>
                    )
                })}
            </div>
        </div>
    );
};

export default Desktop;

interface DesktopProps {
};

interface TabType {
        [key: string]: {
            top: number;
            right: number;
            zIndex?: number;
}}

//TODO: move out
const DefaultTabDict: TabType = {
    'about': {right: 400, top: 50},
    'project': {right: 650, top: 150},
    'contact': {right: 300, top: 100},
}



