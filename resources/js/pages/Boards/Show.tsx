import BoardHeader from '@/components/board/BoardHeader';
import ListCard from '@/components/ListCard';
import ListForm from '@/components/ListForm';
import TaskItem from '@/components/task/TaskItem';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Board, type List, Task } from '@/types';
import { closestCenter, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Head, router, usePage } from '@inertiajs/react';
import { act, use, useEffect, useMemo, useState } from 'react';
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
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [lists, setLists] = useState<List[]>(board.lists);
  const [tasks, setTasks] = useState<Task[]>(lists.flatMap((list) => list.tasks));
  const lists_ids = useMemo(() => lists.map((list) => `list-id:${list.id}`), [lists]);

  useEffect(() => {
    setLists((prevLists) => {
      const updatedLists = prevLists.map((list) => ({
        ...list,
        tasks: tasks.filter((task) => task.task_list_id === list.id),
      }));

      // Solo actualiza si realmente cambió
      if (JSON.stringify(prevLists) === JSON.stringify(updatedLists)) {
        return prevLists;
      }

      return updatedLists;
    });
  }, [board.lists, tasks]);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragOver={OnDragOver}
        sensors={sensors}
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
              {activeList && <ListCard list={activeList} />}
              {activeTask && <TaskItem task={activeTask} />}
            </DragOverlay>
            , document.body)}
          {showAddModal && <ListForm board={board} onClose={() => setShowAddModal(false)} />}
        </div>
      </DndContext>
    </AppLayout>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'list') {
      setActiveList(event.active.data.current.list);
    }
    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveTask(null);
    setActiveList(null);
    if (!over) return;

    const activeId = Number(String(active.id).split(':')[1]);
    const overId = Number(String(over.id).split(':')[1]);
    const isActiveAList = active.data.current?.type === 'list';
    const isOverAList = over.data.current?.type === 'list';
    const isActiveATask = active.data.current?.type === 'task';
    const isOverATask = over.data.current?.type === 'task';

    if (isActiveAList && isOverAList) {
      if (activeId === overId) return;

      const activeIndex = lists.findIndex((list) => list.id === activeId);
      const overIndex = lists.findIndex((list) => list.id === overId);
      const updated = arrayMove(lists, activeIndex, overIndex);
      setLists(updated);

      router.put(route('boards.reorderLists', board.id), {
        lists: updated.map((t, i) => ({ id: t.id, position: i })),
      });
    }
    if (isActiveATask) {
      router.put(route('boards.reorderTasks', board.id), {
        tasks: tasks.map((t, i) => ({ id: t.id, position: i, list_id: t.task_list_id }))
      })
    }
  }

  function OnDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = Number(String(active.id).split(':')[1]);
    const overId = Number(String(over.id).split(':')[1]);

    if (activeId === overId) return;

    const isActiveAtask = active.data.current?.type === 'task';
    const isOverAtask = over.data.current?.type === 'task';

    // Dropping a task over another task
    if (isActiveAtask && isOverAtask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].task_list_id = tasks[overIndex].task_list_id;

        return arrayMove(tasks, activeIndex, overIndex);
      })
    }

    const isOverAColumn = over.data.current?.type === 'list';

    // Dropping a task over a column
    if (isActiveAtask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        tasks[activeIndex].task_list_id = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }

  }

}
