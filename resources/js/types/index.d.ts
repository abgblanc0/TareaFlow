import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Board {
    id: number;
    title: string;
    description: string;
    user: User;
    lists: List[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface List {
    id: number;
    title: string;
    board: Board;
    tasks: Task[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    list: List;
    created_at: string;
    updated_at: string;
    done: boolean;
    [key: string]: unknown;
}