import { useForm } from '@inertiajs/react';

export default function InviteUserModal({
  boardId,
  onClose,
}: {
  boardId: number;
  onClose: () => void;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('boards.invite', { board: boardId }), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-sm"
      >
        <h2 className="text-lg font-bold text-gray-800">Invitar usuario</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email del usuario
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black p-1"
            required
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Invitar
          </button>
        </div>
      </form>
    </div>
  );
}
