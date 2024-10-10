// components/Container.tsx
import { useDroppable } from '@dnd-kit/core';
import { Item } from '@/app/testing/(routes)/scheduling/components/Item';

interface ContainerProps {
  id: string;
  items: { id: string; type: string }[];
  title: string;
}

export const Container = ({ id, items, title }: ContainerProps) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={{ border: '1px solid black', padding: '1rem', width: '50%' }}>
      <h2>{title}</h2>
      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        items.map((item) => <Item key={item.id} id={item.id} type={item.type} />)
      )}
    </div>
  );
};
