import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <nav className="flex items-center justify-end gap-4 p-6">
                    {auth.user ? (
                        <Link
                            href={route('boards')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Mis tableros
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Iniciar sesion
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Registarse
                            </Link>
                        </>
                    )}
                </nav>
                <main className="flex flex-1 flex-col items-center justify-center gap-8 p-6 text-center text-emerald-200">
                    <h1 className="text-4xl font-bold">TareaFlow</h1>
                    <p className="max-w-xl text-lg">Organiza tus tareas y colabora con tu equipo desde cualquier lugar.</p>
                    <ul className="grid gap-2 text-left">
                        <li>• Organiza tus tareas en tableros y listas</li>
                        <li>• Comparte tableros con tus compañeros</li>
                        <li>• Consulta el calendario para ver tus fechas límite</li>
                    </ul>
                </main>
            </div>
        </>
    );
}