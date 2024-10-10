// components/Item.tsx
import { useDraggable } from '@dnd-kit/core';

interface ItemProps {
  id: string;
  type: string;
}

export const Item = ({ id, type }: ItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { id, type },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: isDragging ? 'lightblue' : 'white',
    padding: '1rem',
    margin: '0.5rem 0',
    border: '1px solid gray',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {type.toUpperCase()} Order - {id}
    </div>
  );
};
