import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Task } from '@/types';

type Props = {
  task: Task;
  onSaved?: (description: string) => void; // callback opcional
};

export default function Description({ task, onSaved }: Props) {
  const [editing, setEditing] = useState(!task.description); // si no hay descripción → empieza editando
  const [text, setText] = useState(task.description ?? '');
  const [processing, setProcessing] = useState(false);

  const save = () => {
    setProcessing(true);
    router.put(
      route('tasks.update', task.id),
      { description: text.trim() === '' ? null : text.trim() },
      {
        preserveScroll: true,
        onSuccess: () => {
          setProcessing(false);
          const isEmpty = text.trim() === '';
          if (isEmpty) {
            setEditing(true);
          } else {
            setEditing(false);
          }
          onSaved?.(text.trim());
        },
        onError: () => setProcessing(false),
      }
    );
  };


  if (editing) {
    return (
      <div className="w-1/2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Añade una descripción..."
          className="w-full resize-none p-2 placeholder-gray-400 border rounded-lg"
          rows={4}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setEditing(false);
              setText(task.description ?? '');
            }}
            className="hover:bg-red-500 hover:cursor-pointer mt-2 p-2 rounded"
            disabled={processing}
          >
            Cancelar
          </button>
          <button
            onClick={save}
            className="px-3 py-1 disabled:opacity-50 hover:cursor-pointer hover:bg-green-500 mt-2 p-2 rounded"
            disabled={processing}
          >
            {processing ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-1/2">
      <div className='flex justify-between border-b-2'>
        <h2 className='p-2'>Descripción</h2>
        <button
          onClick={() => setEditing(true)}
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 hover:cursor-pointer"
        >
          Editar
        </button>
      </div>
      <p className="whitespace-pre-line text-gray-100">{task.description}</p>
    </div>
  );
}
