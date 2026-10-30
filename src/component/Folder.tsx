import React, { useCallback, useState } from 'react';
import { isEquals } from 'immutability-helper';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { Preview } from 'react-dnd-preview'

const Folder: React.FC<FolderProps> = ({ imageSrc, id, right, top, onClick, href, hoverImageSrc, isTouchDevice}) => {

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
            <a
            ref={drag}
            href={href}
            target={href.startsWith('https://') ? '_blank' : undefined}
            rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}
            aria-label={id === '???' ? 'My story' : id}
            className={`desktop-folder flex flex-col items-center justify-center absolute w-28 h-28 cursor-pointer`}
            style={{right : `${right}px`, top : `${top}px`, opacity: isDragging ? 0 : 1}}
            onClick={(event) => {
              // Keep normal browser navigation for modified clicks and external links.
              if (href.startsWith('https://') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              onClick();
            }}
            onMouseOver={() => setHoverd(true)}
            onMouseOut={() => setHoverd(false)}
            >
                <img className='w-[85%]' src={hovered? hoverImageSrc: imageSrc} alt=""/>
                <p className='text-center font-bold'>{id}</p>

            </a>
            {isTouchDevice && <Preview generator={generatePreview} /> }
            
        </>
        )
};


interface FolderProps {
    imageSrc: string;
    id: string;
    right: number;
    top: number;
    onClick: () => void;
    href: string;
    isTouchDevice: boolean;
    hoverImageSrc?: string;
  }
  

export default Folder;
