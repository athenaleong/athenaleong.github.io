import { useDrag } from 'react-dnd';
import React, {useState} from 'react';

const Tab: React.FC<TabProps> = ({ id, right, top, children, removeTab, zIndex, onClick}) => {

  const [isOverContent, setIsOverContent] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tab',
    item: { id, right, top, 'type': 'tab' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: (monitor) => {
        return !isOverContent;
    }

  }), [id, right, top, isOverContent]);


 
    return (
        <div
        ref={drag}
        className={`absolute max-w-[800px] w-auto max-h-[600px] flex flex-col text-black dark:text-stone-300`}
        style={{right : `${right}px`, top : `${top}px`, zIndex: zIndex, opacity: isDragging ? 0 : 1}}
        onClick={onClick}
        >
            <div 
            className='w-full bg-gray-300 h-10 flex justify-start border-black border-[4px] border-b-0 rounded-t-xl dark:border-slate-950 dark:bg-gray-700'
            >
                <div
                    onClick={() => removeTab(id)}
                    className="bg-figma-red border-r-4 h-10 border-black w-10 items-center align-middle flex justify-center rounded-tl-lg font-bold cursor-pointer dark:border-slate-950"
                >X</div>
                
                <div className='grow flex items-center justify-center cursor-move'>
                    <p className='font-bold font-code'>
                        {id} {isOverContent ? 'is over content' : ''}
                    </p>
                </div>
            </div>
            <div 
                className='overflow-y-scroll solid-black-border rounded-b-xl dark:border-slate-950'
                onMouseEnter={(e: any) => {
                    setIsOverContent(true);
                }}
                onTouchStart={(e: any) => {
                    setIsOverContent(true);
                }}
                onMouseLeave={(e: any) => {
                    setIsOverContent(false);
                }}
                onTouchEnd={(e: any) => {
                    setIsOverContent(false);
                }}
            >
                {children}
            </div>
        </div>
    );

};


interface TabProps {
    id: string;
    right: number;
    top: number;
    children: React.ReactNode;
    removeTab: (id: string) => void;
    onClick: () => void;
    zIndex?: number;

  }
  

export default Tab;