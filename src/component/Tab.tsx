import { useDrag } from 'react-dnd';

const Tab: React.FC<TabProps> = ({ id, right, top, children, removeTab}) => {
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
        className={`absolute min-w-[500px] min-h-[500px] bg-white flex flex-col`}
        style={{right : `${right}px`, top : `${top}px`}}
        >
            <div 
            className='w-full h-10 bg-gray-300 flex justify-end'
            >
                <button
                    onClick={() => removeTab(id)}
                >X</button>
            </div>
            <div>
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
  }
  

export default Tab;