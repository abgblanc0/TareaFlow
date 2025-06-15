import { Task } from "@/types";
import { X } from "lucide-react";
import Description from "./Description";
import Comments from "./Comments";
import { useState } from "react";
import DueDateModal from "@/components/task/DueDateModal";

export default function TaskDetail({ onClose, task }: { onClose: () => void; task: Task }) {
  const [showDateModal, setShowDateModal] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-zinc-800  rounded-lg shadow-lg p-6 w-4/5 flex flex-col min-h-32">
        <div className="border-b-2 border-black w-full flex justify-between text-gray-200 p-2 mb-5">
          <h2>{task.title}</h2>
          <div className="flex gap-5">
            <button
              onClick={() => setShowDateModal(true)}
              className="hover:cursor-pointer hover:bg-gray-500"
            >
              {task.due_date ? task.due_date : 'X/X/XXXX'}{' '}
            </button>
            <button onClick={onClose} className="hover:cursor-pointer hover:text-red-600"><X size={20} /></button>
          </div>
        </div>
        <div className="flex gap-4">
          <Description task={task} onSaved={(d) => console.log('Guardado:', d)} />
          <Comments task={task} />
        </div>
      </div>
      {showDateModal && (
        <DueDateModal task={task} onClose={() => setShowDateModal(false)} />
      )}
    </div>
  );
}
