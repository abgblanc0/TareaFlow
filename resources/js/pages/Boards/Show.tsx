import BoardHeader from '@/components/board/BoardHeader';
import ListCard from '@/components/ListCard';
import ListForm from '@/components/ListForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Board, type List } from '@/types';
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Head, router, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Mis tableros',
    href: '/boards',
  },
];

export default function Index() {

  const [showAddModal, setShowAddModal] = useState(false);
  const { board } = usePage<{ board: Board }>().props;
  const [activeList, setActiveList] = useState<List | null>(null);

  const [lists, setLists] = useState(board.lists);
  const lists_ids = useMemo(() => lists.map((list) => list.id), [lists]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <Head title={board.title} />
        <BoardHeader board={board} />
        <div className="flex gap-4 overflow-x-auto m-6">
          <SortableContext items={lists_ids} strategy={horizontalListSortingStrategy} id={board.id.toString()}>
            {board.lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </SortableContext>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className='h-20 w-40 border rounded-2xl hover:bg-green-500 m-6 hover:cursor-pointer'
        >
          Lista nueva
        </button>

        {createPortal(
          <DragOverlay>
            {activeList && <ListCard list={activeList} />}
          </DragOverlay>, document.body)}

        {showAddModal && <ListForm board_id={board.id} onClose={() => setShowAddModal(false)} />}
      </DndContext>
    </AppLayout>
  );

  function onDragStart(event: DragStartEvent) {
    console.log("event", event);

    if (event.active.data.current?.type === "list") {
      setActiveList(event.active.data.current.list);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
  }
}
