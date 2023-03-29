import React, { Component, useState, useCallback } from 'react';
import Folder, {FolderState} from '../component/Folder';
import update from 'immutability-helper';
import { useDrop, DropTargetMonitor } from 'react-dnd'

//TODO: move out
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const Desktop = () => {

    const [folders, setFolders] = useState<FolderState[]>([
        { id: '1', imageSrc: './src/assets/react.svg', left: 100, top: 300},
        { id: '2', imageSrc: './src/assets/react.svg', left: 200, top: 400 },
        { id: '3', imageSrc: './src/assets/react.svg', left: 300, top: 500 },
      ]);


    const moveFolder = useCallback(
    (id: string, left: number, top: number) => {
        setFolders(
        update(folders, {
            [id]: {
            $merge: { left, top },
            },
        }),
        )
    },
    [folders, setFolders],
    )

    const [, drop] = useDrop(
        () => ({
            accept: 'folder',
            drop(item: FolderState, monitor: any) {
                const delta = monitor.getDifferenceFromInitialOffset() as { x: number; y: number }
                let left = Math.round(item.left + delta.x)
                let top = Math.round(item.top + delta.y)
                moveFolder(item.id, left, top)
                return undefined
            },
        }),
        [moveFolder],
    )


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="w-screen h-screen bg-yellow-300 flex flex-col fixed">
                <div className='w-screen h-10 bg-orange-300'>

                </div>
                <div ref={drop} className='w-screen bg-blue-300 shrink h-screen relative'>
                    <h1>Desktop</h1>
                    {folders.map((folder) => (
                        <Folder key={folder.id} imageSrc={folder.imageSrc} left={folder.left} top={folder.top} id={String(folder.id)}/>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default Desktop;

interface DesktopProps {
};

