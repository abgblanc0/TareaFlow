import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Comments({ task }: { task: Task }) {
  const [content, setContent] = useState('');

  const { auth } = usePage<{ auth: { user: { id: number } } }>().props;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    router.post(route('comments.store', { task: task.id }), { content }, {
      onSuccess: () => setContent(''),
    });
  };

  return (
    <div className="text-white space-y-4">
      <h2 className="font-semibold text-sm flex items-center gap-2">
        🗨️ Comentarios
      </h2>

      {/* Campo para comentar */}
      <form onSubmit={submit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe un comentario..."
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
          rows={3}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
        >
          Comentar
        </button>
      </form>

      {/* Lista de comentarios */}
      <div className="space-y-4">
        {task.comments.map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            <img
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${c.user?.id ?? 'anon'}`}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="text-sm font-semibold">{c.user?.name ?? 'Anónimo'}</div>
              <div className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(c.created_at), { addSuffix: true, locale: es })}
              </div>
              <div className="bg-zinc-800 p-2 rounded mt-1 text-sm">{c.content}</div>
              {
                c.user_id === auth.user.id && <div className="text-xs mt-1 text-blue-400 space-x-3 cursor-pointer">
                  <button className="hover:underline">Editar</button>
                  <button
                    onClick={() => router.delete(route('comments.destroy', c.id))}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
