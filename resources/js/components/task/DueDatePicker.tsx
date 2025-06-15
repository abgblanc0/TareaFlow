import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Task } from '@/types';

type Props = {
  task: Task;
  onSaved?: (dueDate: string | null) => void;
};

export default function DueDatePicker({ task, onSaved }: Props) {
  const [date, setDate] = useState(task.due_date ?? '');
  const [processing, setProcessing] = useState(false);

  const save = () => {
    setProcessing(true);
    router.put(
      route('tasks.update', task.id),
      { due_date: date || null },
      {
        preserveScroll: true,
        onSuccess: () => {
          setProcessing(false);
          onSaved?.(date || null);
        },
        onError: () => setProcessing(false),
      }
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">Fecha límite</label>
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split('T')[0]}
        onChange={(e) => setDate(e.target.value)}
        className="rounded border-gray-300 text-black p-2"
      />

      <button
        onClick={save}
        disabled={processing}
        className="mt-2 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        Guardar
      </button>
    </div>
  );
}
