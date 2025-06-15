import { Board } from "@/types";
import { Plus } from 'lucide-react'
import { useState } from "react";
import InviteUserModal from "./InviteUserModal";

export default function BoardHeader({ board }: { board: Board }) {
  const [showInvite, setShowInvite] = useState(false);


  return (
    <div className="flex items-center gap-4 m-4">
      <h1 className="text-xl font-bold text-white">{board.title}</h1>
      <div className="flex gap-2 items-center">
        {board.users.map((user) => (
          <div
            key={user.id}
            className="w-8 h-8 rounded-full bg-zinc-700 text-sm flex items-center justify-center text-white"
            title={user.name}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
        ))}
        <button
          onClick={() => setShowInvite(true)} // esto te abre un modal o algo similar
          className="rounded-full bg-zinc-700 p-2 hover:bg-green-500"
          title="Invitar colaborador"
        >
          <Plus size={20} />
        </button>
      </div>
      {showInvite && <InviteUserModal boardId={board.id} onClose={() => setShowInvite(false)} />}
    </div>
  );
}
