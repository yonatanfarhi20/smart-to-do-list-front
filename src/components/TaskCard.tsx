import { Task } from '@/types/task';

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 
        ${task.isCompleted
                ? 'bg-zinc-50 border-zinc-200/80 opacity-60'
                : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
            }`}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* כפתור סימון וי */}
                <button
                    onClick={() => onToggleComplete(task._id)}
                    className={`flex items-center justify-center w-5 h-5 rounded-md border transition-colors flex-shrink-0
            ${task.isCompleted
                        ? 'bg-zinc-900 border-zinc-900 text-white'
                        : 'border-zinc-300 hover:border-zinc-400'
                    }`}
                >
                    {task.isCompleted && (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    )}
                </button>

                {/* כותרת המשימה */}
                <span
                    className={`text-sm md:text-base font-medium truncate select-none ${
                        task.isCompleted ? 'line-through text-zinc-400' : 'text-zinc-700'
                    }`}
                >
          {task.title}
        </span>
            </div>

            {/* כפתור מחיקה */}
            <button
                onClick={() => onDelete(task._id)}
                className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-zinc-100 transition-colors flex-shrink-0 mr-2"
                aria-label="מחק משימה"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
    );
}