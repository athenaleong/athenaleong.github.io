import { useDrag } from 'react-dnd';

const Tab: React.FC<TabProps> = ({ id, right, top, children, removeTab, zIndex, onClick}) => {
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
        className={`absolute max-w-[800px] max-h-[600px] flex flex-col`}
        style={{right : `${right}px`, top : `${top}px`, zIndex: zIndex}}
        onClick={onClick}
        >
            <div 
            className='w-full bg-gray-200 h-10 flex justify-start border-black border-[4px] border-b-0 rounded-t-xl '
            >
                <div
                    onClick={() => removeTab(id)}
                    className="bg-figma-red border-r-4 h-10 border-black w-10 items-center align-middle flex justify-center rounded-tl-lg text-white font-bold cursor-pointer"
                >X</div>
            </div>
            <div className='overflow-y-scroll solid-border rounded-b-xl'>
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
    onClick: () => void;
    zIndex?: number;

  }
  

export default Tab;