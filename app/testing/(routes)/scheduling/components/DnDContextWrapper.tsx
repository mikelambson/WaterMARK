"use client";
import { DndContext, DragEndEvent, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { Container } from '@/app/testing/(routes)/scheduling/components/Container';

interface Item {
  id: string; 
  type: string;
}

interface Containers {
  unscheduled: Item[];
  scheduled: Item[];
}

const DnDContextWrapper = () => {
  const [containers, setContainers] = useState<Containers>({
    unscheduled: [
      { id: '1125', type: 'pending' }, 
      { id: '2254', type: 'delayed' },
    ],
    scheduled: [
      { id: '382', type: 'unmovable' },
      { id: '376', type: 'standard' },
    ],
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const fromContainer = findContainer(active.id);
    const toContainer = findContainer(over.id);

    if (fromContainer && toContainer && fromContainer !== toContainer) {
      setContainers((prevContainers) => {
        const fromItems = prevContainers[fromContainer].filter((item) => item.id !== active.id); 
        const toItems = [...prevContainers[toContainer], { ...active.data.current }];

        return {
          ...prevContainers,
          [fromContainer]: fromItems,
          [toContainer]: toItems,
        };
      });
    }
  };

  const findContainer = (itemId: UniqueIdentifier): keyof Containers | null => {
    if (containers.unscheduled.find((item) => item.id === itemId)) {
      return 'unscheduled';
    } else if (containers.scheduled.find((item) => item.id === itemId)) {
      return 'scheduled';
    }
    return null;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={'flex justify-between px-4 bg-card'}>
        <Container id="unscheduled" items={containers.unscheduled} title="Unscheduled Orders" /> 
        <Container id="scheduled" items={containers.scheduled} title="Scheduled Orders" /> 
      </div>
      <DragOverlay>{/* You can render the drag preview here */}</DragOverlay>
    </DndContext>
  );
};

export default DnDContextWrapper;
