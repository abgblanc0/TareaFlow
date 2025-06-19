import { List } from '@/types';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import TaskForm from '@/components/task/TaskForm';
import TaskItem from '@/components/task/TaskItem';
import { CSS } from '@dnd-kit/utilities';

export default function ListCard({ list }: { list: List }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const tasks_ids = useMemo(() => list.tasks.map((task) => `task-id:${task.id}`), [list.tasks]);

  const { setNodeRef, listeners, attributes, transform, transition, isDragging } = useSortable({
    id: `list-id:${list.id}`,
    data: {
      type: 'list',
      list,
    }
  })

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (title.trim() && title !== list.title) {
      router.put(route('lists.update', list.id), { title });
    }
    setEditingTitle(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    const element = document.querySelector(`[list-id="${list.id}"]`);
    const rect = element?.getBoundingClientRect();

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      width: rect?.width,
      height: rect?.height
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-zinc-800 p-2 rounded-lg shadow w-64 flex flex-col opacity-40 border-2 border-rose-500"
      >
      </div>
    )
  }

  return (
    <div
      list-id={`${list.id}`}
      ref={setNodeRef}
      style={style}
      className="bg-zinc-800 p-2 rounded-lg shadow w-64 flex flex-col"
    >
      {editingTitle ? (
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSubmit}
            autoFocus
            className="font-semibold text-lg mb-1 p-1 rounded bg-zinc-700 text-white w-full"
          />
        </form>
      ) :
        <h2
          {...attributes}
          {...listeners}
          onDoubleClick={() => setEditingTitle(true)}
          className="font-semibold text-lg mb-1 p-2 hover:cursor-grab"
        >
          {list.title}
        </h2>
      }

      <SortableContext items={tasks_ids} strategy={verticalListSortingStrategy} id={list.id.toString()}>
        <div className="flex flex-col gap-1 flex-grow">
          {list.tasks.length === 0 && (
            <p className="text-sm text-gray-500">No hay tareas</p>
          )}
          {list.tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>

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
