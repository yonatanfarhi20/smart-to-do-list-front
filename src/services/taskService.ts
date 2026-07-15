import { Task, TaskPeriod } from '@/types/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const taskService = {
    // שליפת כל המשימות (GET /api/tasks)
    async getTasks(): Promise<Task[]> {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch tasks');
        return res.json();
    },

    // יצירת משימה חדשה (POST /api/tasks)
    async createTask(title: string, period: TaskPeriod): Promise<Task> {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, period }),
        });
        if (!res.ok) throw new Error('Failed to create task');
        return res.json();
    },

    // עדכון סטטוס ביצוע של משימה (PATCH /api/tasks/:id)
    async updateTaskStatus(id: string, isCompleted: boolean): Promise<Task> {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted }),
        });
        if (!res.ok) throw new Error('Failed to update task status');
        return res.json();
    },

    // מחיקת משימה (DELETE /api/tasks/:id)
    async deleteTask(id: string): Promise<void> {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to delete task');
    },
};