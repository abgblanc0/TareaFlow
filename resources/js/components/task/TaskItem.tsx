import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { GripVertical, Trash2, CalendarOff } from 'lucide-react';
import { Task } from '@/types';
import TaskDetail from './TaskDetail';

export default function TaskItem({ task, id }: {
  task: Task, id: string
}) {
  const [showModal, setShowModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
    data: {
      type: 'task',
      task,
    }
  });

  const expired = task.due_date && new Date(task.due_date) < new Date();

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
        className={`bg-black p-2 rounded-lg shadow-sm border list-none flex flex-col justify-between gap-2 hover:border-white cursor-pointer ${task.done ? 'opacity-50 line-through' : ''
          }`}
        onClick={() => setShowModal(true)}
      >
        {/* Parte superior: iconos y título */}
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-white">
            <GripVertical size={16} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleDone();
            }}
            className={`rounded-full w-5 h-5 flex-shrink-0 border-2 cursor-pointer ${task.done ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
              }`}
            aria-label="Marcar como hecho"
          />
          <div className="flex-1 min-w-0 break-words text-white font-medium">
            {task.title}
          </div>
          <button
            className="hover:text-red-600 ml-2"
            onClick={(e) => {
              e.stopPropagation();
              router.delete(route('tasks.destroy', task.id));
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>

        {(task.due_date || expired) && (
          <div className="flex justify-end items-center gap-1 text-xs text-gray-400 mt-1">
            {expired && <CalendarOff size={14} color="red" />}
            {task.due_date && <span>{task.due_date}</span>}
          </div>
        )}
      </ul>
      {showModal && <TaskDetail task={task} onClose={() => setShowModal(false)} />}
    </div>
  );
}
