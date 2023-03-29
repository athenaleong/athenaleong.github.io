import { isEquals } from 'immutability-helper';
import { useDrag } from 'react-dnd';

const Folder: React.FC<FolderProps> = ({ imageSrc, id, right, top, onClick }) => {
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
        className={`absolute w-10 h-10 bg-red-100 ${isDragging ? 'opacity-50' : ''}`}
        style={{ backgroundImage: `url(${imageSrc})`, right : `${right}px`, top : `${top}px` }}
        onClick={onClick}
        >
            {top},{right}
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
  }
  

export default Folder;
