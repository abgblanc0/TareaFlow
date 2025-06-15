import { List } from "@/types";
import { router, useForm } from "@inertiajs/react";

interface TaskFormProps {
  list: List;
  onClose: () => void;
}


export default function TaskForm({ onClose, list }: TaskFormProps) {
  const { data, setData, processing, errors, reset } = useForm({
    title: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(list.tasks.length);
    router.post(route('tasks.store', { taskList: list.id }), {
      title: data.title,
      position: list.tasks.length,
    });
    reset();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4 text-gray-800"
      >
        <h2 className="text-xl font-semibold text-gray-900">Nueva tarea</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título de la tarea
          </label>
          <input
            id="title"
            type="text"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-gray-900"
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
}