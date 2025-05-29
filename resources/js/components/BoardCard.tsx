import { router } from '@inertiajs/react';
import { Board } from '@/types';
import { Trash2 } from 'lucide-react';

export default function BoardCard({ board }: { board: Board }) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Seguro que quieres borrar este tablero?')) {
      router.delete(route('boards.destroy', board.id));
    }
  };

  const handleClick = () => {
    router.visit(`/boards/${board.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 cursor-pointer p-4 rounded-lg w-64 h-40 flex-col flex justify-between"
    >
      <h3 className="text-lg font-semibold mb-2">{board.title}</h3>
      <button
        onClick={handleDelete}
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
