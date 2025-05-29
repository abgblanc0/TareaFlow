import React from 'react';
import { usePage, router } from '@inertiajs/react';
import { User } from '@/types';
import AppLayout from '@/layouts/app-layout';

export default function UsersIndex() {
  const { users } = usePage<{ users: { data: User[]; current_page: number; last_page: number; total: number } }>().props;
  const th_class = 'border border-gray-300 px-4 py-2 text-left';
  const td_class = 'border border-gray-300 px-4 py-2';

  const handleDelete = (userId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      router.delete(`/admin/users/${userId}`, {
        onSuccess: () => {
          alert('Usuario eliminado con éxito');
        },
        onError: () => {
          alert('Error al eliminar el usuario');
        }
      });
    }
  };

  return (
    <AppLayout breadcrumbs={[]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Usuarios registrados</h1>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className={th_class}>ID</th>
              <th className={th_class}>Nombre</th>
              <th className={th_class}>Email</th>
              <th className={th_class}>Fecha creación</th>
              <th className={th_class}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map(user => (
              <tr key={user.id}>
                <td className={td_class}>{user.id}</td>
                <td className={td_class}>{user.name}</td>
                <td className={td_class}>{user.email}</td>
                <td className={td_class}>{new Date(user.created_at).toLocaleDateString()}</td>
                <td className={td_class}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación sencilla */}
        <div className="mt-4 flex justify-between">
          <button
            disabled={users.current_page === 1}
            onClick={() => router.visit(`/admin/users?page=${users.current_page - 1}`)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {users.current_page} de {users.last_page}
          </span>
          <button
            disabled={users.current_page === users.last_page}
            onClick={() => router.visit(`/admin/users?page=${users.current_page + 1}`)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </AppLayout>
  );
}