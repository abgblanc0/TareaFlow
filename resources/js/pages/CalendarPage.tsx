import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { Task } from '@/types';
import AppLayout from '@/layouts/app-layout';
import TaskItem from '@/components/task/TaskItem';
import { BookOpenCheck } from 'lucide-react';

export default function CalendarPage({ tasks }: { tasks: Task[] }) {
  const [value, setValue] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const selectedTasks = tasks.filter(task => {
    if (!task.due_date) return false;
    const due = new Date(task.due_date).toDateString();
    return due === selectedDate?.toDateString();
  });
  const tasksByDate = tasks.reduce((acc, task) => {
    if (task.due_date) {
      const date = new Date(task.due_date).toDateString();
      acc[date] = acc[date] || [];
      acc[date].push(task);
    }
    return acc;
  }, {} as Record<string, Task[]>);

  const handleOnchange = (v: any) => {
    setValue(v as Date);
    setSelectedDate(v as Date);
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dayTasks = tasksByDate[date.toDateString()];
    if (!dayTasks) return null;

    return (
      <div>...</div>
    );
  };

  return (
    <AppLayout breadcrumbs={[]}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-white">Calendario de tareas</h1>
        <div className="bg-white p-4 rounded-xl shadow text-black">
          <Calendar
            value={value}
            onChange={handleOnchange}
            tileContent={tileContent}
          />
        </div>
        <div className="mt-6">
          <h2 className="text-white text-lg mb-2">
            Tareas para el {selectedDate?.toLocaleDateString()}
          </h2>
          {selectedTasks.length === 0 ? (
            <p className="text-gray-400">No hay tareas en esta fecha.</p>
          ) : (
            <ul className="space-y-2">
              {selectedTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
