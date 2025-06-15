import { Task } from '@/types';
import DueDatePicker from '@/components/task/DueDatePicker';

export default function DueDateModal({ task, onClose }: { task: Task; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">Editar fecha límite</h2>
        <DueDatePicker task={task} onSaved={onClose} />
        <button onClick={onClose} className="mt-4 text-sm text-blue-600 hover:underline">
          Cerrar
        </button>
      </div>
    </div>
  );
}
