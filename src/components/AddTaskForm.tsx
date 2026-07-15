import { useState } from 'react';
import { TaskPeriod } from '@/types/task';

interface AddTaskFormProps {
    onAddTask: (title: string, period: TaskPeriod) => void;
}

export default function AddTaskForm({ onAddTask }: AddTaskFormProps) {
    const [title, setTitle] = useState('');
    const [period, setPeriod] = useState<TaskPeriod>('morning');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask(title.trim(), period);
        setTitle('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 bg-white border border-zinc-200 p-4 rounded-2xl w-full shadow-sm"
        >
            {/* תיבת קלט לטקסט */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="הוסף משימה חדשה..."
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all"
            />

            {/* בחירת זמן ביום */}
            <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as TaskPeriod)}
                className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-sm text-zinc-700 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all cursor-pointer"
            >
                <option value="morning">☀️ בוקר</option>
                <option value="afternoon">🌤️ צהריים</option>
                <option value="evening">🌙 ערב</option>
            </select>

            {/* כפתור הוספה */}
            <button
                type="submit"
                className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
            >
                הוסף משימה
            </button>
        </form>
    );
}