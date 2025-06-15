import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { GripVertical, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import TaskDetail from './TaskDetail';

export default function TaskItem({ task }: {
  task: Task
}) {

  console.log(task);
  const [showModal, setShowModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleDone = () => {
    router.put(route('tasks.update', task.id), { done: !task.done });
  };

  return (
    <div>
      <ul
        ref={setNodeRef}
        style={style}
        key={task.id}
        className={`hover:border-white hover:cursor-pointer bg-black p-3 rounded-lg shadow-sm border list-none flex items-center gap-2 ${task.done ? 'opacity-50 line-through' : ''
          }`}
        onClick={() => setShowModal(true)}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-white"
          title="Arrastrar"
        >
          <GripVertical size={16} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDone();
          }}
          className={`rounded-full w-5 h-5 flex-shrink-0 border-2 cursor-pointer ${task.done ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
            }`}
          aria-label={task.done ? 'Marcar como no hecho' : 'Marcar como hecho'}
        />
        <li className="font-medium text-white">{task.title}</li>
        <button
          className="ml-auto hover:text-red-600"
          onClick={(e) => { e.stopPropagation(); router.delete(route('tasks.destroy', task.id)) }}
        >
          <Trash2 size={18} />
        </button>

      </ul>
      {showModal && <TaskDetail task={task} onClose={() => setShowModal(false)} />}
    </div>
  );
}
