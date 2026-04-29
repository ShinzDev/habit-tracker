// lib/types/index.ts

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Session {
    userId: number;
    token: string;
}

export interface Habit {
    id: number;
    name: string;
    completed: boolean;
}