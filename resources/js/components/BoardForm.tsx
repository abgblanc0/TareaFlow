import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function BoardForm({ onClose }: { onClose: () => void }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('boards.store'), {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Crear nuevo tablero</h2>

        <form onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={data.title}
              onChange={e => setData('title', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-800 bg-white"
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={e => setData('description', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-800 bg-white"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Crear
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
