import { List } from '@/types';
import TaskItem from './TaskItem';
import { Trash2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import TaskForm from './TaskForm';

export default function ListCard({ list }: { list: List }) {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bg-zinc-800 p-4 rounded-lg shadow w-64 flex flex-col h-full">
      <h2 className="font-semibold text-lg mb-1">{list.title}</h2>
      <div className="flex flex-col gap-2 flex-grow">
        {list.tasks.length === 0 && (
          <p className="text-sm text-gray-500">No hay tareas</p>
        )}
        {list.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
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

      {showAddModal && <TaskForm task_list_id={list.id} onClose={() => setShowAddModal(false)} />}
    </div>
  );

}
