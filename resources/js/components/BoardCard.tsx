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
      className="bg-white hover:bg-gray-50 cursor-pointer p-4 rounded-lg shadow-sm border relative transition-all"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{board.title}</h3>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
