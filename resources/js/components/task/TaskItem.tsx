import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Trash2, CalendarOff } from 'lucide-react';
import { Task } from '@/types';
import TaskDetail from './TaskDetail';

export default function TaskItem({ task }: {
  task: Task
}) {
  const [showModal, setShowModal] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task-id:${task.id}`,
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

  if (isDragging) {
    const element = document.querySelector(`[task-id="${task.id}"]`);
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
        className="bg-black p-3 rounded-lg shadow-sm border-2 border-rose-500 list-none opacity-50"
      >
      </div>
    );
  }

  const toggleDone = () => {
    router.put(route('tasks.update', task.id), { done: !task.done });
  };

  return (
    <div>
      <ul
        task-id={task.id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-black p-3 rounded-lg shadow-sm border list-none flex flex-col justify-between gap-2 hover:border-white cursor-grab ${task.done ? 'opacity-50 line-through' : ''
          }`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              toggleDone();
              e.stopPropagation();
            }}
            className={`rounded-full w-5 h-5 flex-shrink-0 border-2 hover:cursor-pointer ${task.done ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
              }`}
            aria-label="Marcar como hecho"
          />
          <div className="flex-1 min-w-0 break-words text-white font-medium">
            {task.title}
          </div>
          <button
            className="hover:text-red-600 ml-2 hover:cursor-pointer"
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
