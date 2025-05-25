import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';

export default function TaskItem({ task }: { task: { id: number; title: string; done: boolean } }) {

  const toggleDone = () => {
    console.log(task.id);
    router.put(route('tasks.update', task.id), { done: !task.done });
  };

  return (
    <ul
      key={task.id}
      className={`bg-black p-3 rounded-lg shadow-sm border list-none flex items-center gap-2 ${
        task.done ? 'opacity-50 line-through' : ''
      }`}
    >
      <button
        onClick={e => {
          e.stopPropagation();
          toggleDone();
        }}
        className={`rounded-full w-5 h-5 flex-shrink-0 border-2 cursor-pointer ${
          task.done ? 'bg-green-500 border-green-500' : 'bg-white border-gray-400'
        }`}
        aria-label={task.done ? 'Marcar como no hecho' : 'Marcar como hecho'}
      />
      <li className="font-medium text-white">{task.title}</li>
      <button className='ml-auto hover:text-red-600' onClick={() => router.delete(route('tasks.destroy', task.id))}>
        <Trash2 size={18} />
      </button>
    </ul>
  );
}
