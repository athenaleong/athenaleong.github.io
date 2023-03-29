import { useDrag } from 'react-dnd';

const Tab: React.FC<TabProps> = ({ id, right, top, children, removeTab, zIndex}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tab',
    item: { id, right, top, 'type': 'tab' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [id, right, top]);

  if (!isDragging) {
        return (
        <div
        ref={drag}
        className={`absolute max-w-[800px] max-h-[600px] bg-white flex flex-col border-solid border-2 border-black`}
        style={{right : `${right}px`, top : `${top}px`, zIndex: zIndex}}
        >
            <div 
            className='w-full h-10 bg-gray-300 flex justify-end'
            >
                <button
                    onClick={() => removeTab(id)}
                >X</button>
            </div>
            <div className='overflow-y-scroll'>
                {children}
            </div>
        </div>
    );
    } else {
        return (
            <div ref={drag} />
        )
    };
};


interface TabProps {
    id: string;
    right: number;
    top: number;
    children: React.ReactNode;
    removeTab: (id: string) => void;
    zIndex?: number;
  }
  

export default Tab;