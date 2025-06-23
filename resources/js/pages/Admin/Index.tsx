import React, { FormEventHandler } from 'react';
import { usePage, router, useForm } from '@inertiajs/react';
import { User } from '@/types';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

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

  type UserForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
  };

  const { data, setData, post, processing, errors, reset } = useForm<UserForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/admin/users', {
      onSuccess: () => {
        reset();
      },
    });
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

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Añadir usuario</h2>
          <form onSubmit={submit} className="space-y-4 max-w-md">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                disabled={processing}
                placeholder="Nombre"
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                disabled={processing}
                placeholder="email@example.com"
              />
              <InputError message={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                disabled={processing}
                placeholder="Contraseña"
              />
              <InputError message={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
                disabled={processing}
                placeholder="Confirmar contraseña"
              />
              <InputError message={errors.password_confirmation} />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_admin"
                checked={data.is_admin}
                onCheckedChange={(checked) => setData('is_admin', !!checked)}
                disabled={processing}
              />
              <Label htmlFor="is_admin">Administrador</Label>
            </div>

            <Button type="submit" disabled={processing}>Crear usuario</Button>
          </form>
        </div>


      </div>
    </AppLayout>
  );
}