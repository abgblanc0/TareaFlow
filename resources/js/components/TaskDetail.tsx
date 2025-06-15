import { Task } from "@/types";
import { X } from "lucide-react";
import Description from "./description";
import Comments from "./Comments";

export default function TaskDetail({ onClose, task }: { onClose: () => void; task: Task }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-700  rounded-lg shadow-lg p-6 w-4/5 flex flex-col min-h-32">
        <div className="border-b-2 w-full flex justify-between text-gray-200 p-2 mb-5">
          <h2>{task.title}</h2>
          <button onClick={onClose} className="hover:cursor-pointer hover:text-red-600"><X size={20} /></button>
        </div>
        <div className="flex gap-4">
          <Description task={task} onSaved={(d) => console.log('Guardado:', d)} />
          <Comments />
        </div>
      </div>
    </div>
  );
}
