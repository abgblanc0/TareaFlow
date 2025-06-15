import { List } from '@/types';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import TaskForm from '@/components/task/TaskForm';
import TaskItem from '@/components/task/TaskItem';

export default function ListCard({ list }: { list: List }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasks, setTasks] = useState(list.tasks); // local state

  console.log(list);
  useEffect(() => {
    setTasks(list.tasks);   // se dispara cada vez que cambian las props
  }, [list.tasks]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    const updated = arrayMove(tasks, oldIndex, newIndex);
    setTasks(updated);

    console.log(updated);
    router.put(route('lists.reorder', { taskList: list.id }), {
      tasks: updated.map((t, i) => ({ id: t.id, position: i }))
    });
  };

  return (
    <div className="bg-zinc-800 p-2 rounded-lg shadow w-64 flex flex-col h-full">
      <h2 className="font-semibold text-lg mb-1 p-2">{list.title}</h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy} id={list.id.toString()}>
          <div className="flex flex-col gap-1 flex-grow">
            {tasks.length === 0 && (
              <p className="text-sm text-gray-500">No hay tareas</p>
            )}
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className='flex justify-between mt-2'>
        <button
          className='w-6 h-6 border rounded-full hover:text-green-500 cursor-pointer'
          onClick={() => setShowAddModal(true)}
        >+</button>
        <button
          className="mt-auto hover:text-red-600 self-end cursor-pointer"
          onClick={() => router.delete(route('lists.destroy', list.id))}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {showAddModal && <TaskForm list={list} onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
