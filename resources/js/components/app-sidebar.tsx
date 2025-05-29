import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';

// Definir los ítems de navegación principales
const mainNavItems: NavItem[] = [
    {
        title: 'Mis tableros',
        href: '/boards',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/abgblanc0/TareaFlow',
        icon: Folder,
    },
];

export function AppSidebar() {
    // Obtener las props del usuario desde Inertia
    const { auth } = usePage<{ auth: { user: { is_admin?: boolean } } }>().props;

    // Añadir el ítem "Usuarios" solo si el usuario es admin
    const navItems = auth.user?.is_admin
        ? [
            ...mainNavItems,
            {
                title: 'Usuarios',
                href: '/admin/users',
                icon: Users,
            },
        ]
        : mainNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}