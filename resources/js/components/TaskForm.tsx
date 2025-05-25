import { router, useForm } from "@inertiajs/react";

interface TaskFormProps {
  task_list_id: number;
  onClose: () => void;
}


export default function TaskForm({ onClose, task_list_id }: TaskFormProps) {
  const { data, setData, processing, errors, reset } = useForm({
    title: '',
  });

  const submit = (e: React.FormEvent) => {
    console.log(task_list_id);
    e.preventDefault();
    router.post(route('tasks.store', { taskList: task_list_id }), { title: data.title });
    reset();
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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