import React, { useState } from 'react';
import { isEquals } from 'immutability-helper';
import { useDrag } from 'react-dnd';

const Folder: React.FC<FolderProps> = ({ imageSrc, id, right, top, onClick, hoverImageSrc}) => {

    const [hovered, setHoverd] = useState(false);

    const [{ isDragging }, drag] = useDrag(() => ({
    type: 'folder',
    item: { id, right, top, 'type' : 'folder'},
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    }), [id, right, top]);

    if (!isDragging) {
    return (
        <div
        ref={drag}
        className={`flex flex-col items-center justify-center absolute w-28 h-28 ${isDragging ? 'cursor-move' : 'cursor-pointer'}`}
        style={{right : `${right}px`, top : `${top}px` }}
        onClick={onClick}
        onMouseOver={() => setHoverd(true)}
        onMouseOut={() => setHoverd(false)}
        >
            <img className='w-[85%]' src={hovered? hoverImageSrc: imageSrc}/>
            <p className=' font-bold text-center'>{id}</p>
        </div>)
    } else {
    return (
        <div ref={drag} />
    )
    };
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
