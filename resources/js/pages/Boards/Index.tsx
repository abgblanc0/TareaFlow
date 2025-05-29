import BoardCard from '@/components/BoardCard';
import BoardForm from '@/components/BoardForm';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Board } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mis tableros',
        href: '/boards',
    },
];

export default function Index() {
    const [showAddModal, setShowAddModal] = useState(false);

    const { boards } = usePage<{ boards: Board[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mis tableros" />

            <div className='m-5'>
                <div className='flex gap-4 flex-wrap'>
                    {boards.length === 0 && <p>No tienes tableros aún.</p>}
                    {boards.map((board) => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className=" hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/12 mt-10 hover:cursor-pointer"
                >
                    Crear tablero
                </button>
                {showAddModal && <BoardForm onClose={() => setShowAddModal(false)} />}
            </div>
        </AppLayout>
    );
}
