import { useDrag } from 'react-dnd';

export interface FolderState {
  imageSrc: string;
  id: string;
  left: number;
  top: number;
}

const Folder: React.FC<FolderState> = ({ imageSrc, id, left, top }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'folder',
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`absolute w-10 h-10 bg-red-100 ${isDragging ? 'opacity-50' : ''}`}
      style={{ backgroundImage: `url(${imageSrc})`, left : `${left}px`, top : `${top}px` }}
    >
        {top}
    </div>
  );
};

export default Folder;
