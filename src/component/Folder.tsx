import React, { useCallback, useState } from 'react';
import { isEquals } from 'immutability-helper';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Preview, Context, usePreview, PreviewState, usePreviewState } from 'react-dnd-preview'

const Folder: React.FC<FolderProps> = ({ imageSrc, id, right, top, onClick, hoverImageSrc}) => {

    const [hovered, setHoverd] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
    type: 'folder',
    item: { id, right, top, 'type' : 'folder'},
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    }), [id, right, top]);

    // const MyPreview = () => {
    // const preview:usePreviewState = usePreview()
    // if (!preview.display) {
    //     return null
    // }
    // const {itemType, item, style} = preview;
    // if (itemType !== 'folder' && id !== "Projects") {
    //     console.log('not me')
    //     return <></>
    // }
    // return <><img className='w-[85%]' src={hovered? hoverImageSrc: imageSrc}/>
    // <p className='text-center font-bold'>{id}</p></>
    // }
    const generatePreview =({itemType, item, style}: any) => {
        console.log('item', item.id, id)
        if (id === item.id) {
            return(
            <div 
                className={`flex flex-col items-center justify-center absolute w-28 h-28 cursor-pointer`}
                style={style}
            >
                <img className='w-[85%]' src={hoverImageSrc!}/>
                <p className='text-center font-bold'>{id}</p>
            </div>)
        }
        return <></>
    }
            
    return (
        <>
            <div
            ref={drag}
            className={`flex flex-col items-center justify-center absolute w-28 h-28 cursor-pointer`}
            style={{right : `${right}px`, top : `${top}px`, opacity: isDragging ? 0 : 1}}
            onClick={onClick}
            onMouseOver={() => setHoverd(true)}
            onMouseOut={() => setHoverd(false)}
            >
                <img className='w-[85%]' src={hovered? hoverImageSrc: imageSrc}/>
                <p className='text-center font-bold'>{id}</p>

            </div>
            <Preview generator={generatePreview} /> 
            
        </>
        )
};


interface FolderProps {
    imageSrc: string;
    id: string;
    right: number;
    top: number;
    onClick: () => void;
    hoverImageSrc?: string;
  }
  

export default Folder;
