import ListCard from '@/components/ListCard';
import ListForm from '@/components/ListForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Board, type List } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Index() {

  const [showAddModal, setShowAddModal] = useState(false);
  const { board } = usePage<{ board: Board }>().props;
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={board.title} />
      <div className="p-6">
        <div className="flex gap-2 overflow-x-auto">
          {board.lists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
          <button
            onClick={() => setShowAddModal(true)}
            className='h-20 w-40 border rounded-2xl hover:bg-green-500'
          >
            Lista nueva
          </button>
        </div>
      </div>

      {showAddModal && <ListForm board_id={board.id} onClose={() => setShowAddModal(false)} />}
    </AppLayout>
  );
}
