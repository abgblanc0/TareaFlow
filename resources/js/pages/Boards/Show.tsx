import BoardHeader from '@/components/board/BoardHeader';
import ListCard from '@/components/ListCard';
import ListForm from '@/components/ListForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Board, type List } from '@/types';
import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Head, router, usePage } from '@inertiajs/react';
import { use, useEffect, useMemo, useState } from 'react';
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
  const [lists, setLists] = useState<List[]>(board.lists);

  useEffect(() => {
    setLists(board.lists);
  }, [board.lists]);
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
        <div className="flex gap-4 m-6 items-start">
          <SortableContext items={lists_ids} strategy={horizontalListSortingStrategy} id={board.id.toString()}>
            {lists.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
          </SortableContext>
          <button
            onClick={() => setShowAddModal(true)}
            className='h-20 w-40 border rounded-2xl hover:bg-green-500 m-6 hover:cursor-pointer'
          >
            Lista nueva
          </button>
          {createPortal(
            <DragOverlay>
              {activeList &&
                <ListCard list={activeList} />
              }
            </DragOverlay>, document.body)}

          {showAddModal && <ListForm board={board} onClose={() => setShowAddModal(false)} />}
        </div>
      </DndContext>
    </AppLayout>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'list') {
      setActiveList(event.active.data.current.list);
    }
  }


  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeListId = active.id;
    const overListId = over.id;


    if (activeListId === overListId) return;

    const activeIndex = lists.findIndex((list) => list.id === activeListId);
    const overIndex = lists.findIndex((list) => list.id === overListId);

    const updated = arrayMove(lists, activeIndex, overIndex);
    setLists(updated)
    router.put(route('boards.reorder', board.id), { lists: updated.map((t, i) => ({ id: t.id, position: i })) });
  }
}
