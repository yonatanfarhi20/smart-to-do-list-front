import { Task, TaskPeriod } from '@/types/task';
import TaskCard from './TaskCard';

interface DailyColumnProps {
    title: string;
    period: TaskPeriod;
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function DailyColumn({ title, period, tasks, onToggleComplete, onDelete }: DailyColumnProps) {
    // סינון המשימות השייכות לעמודה זו
    const filteredTasks = tasks.filter((task) => task.period === period);

    return (
        <div className="flex flex-col flex-1 min-w-[280px] bg-white border border-zinc-200 rounded-2xl p-5 h-fit min-h-[400px] shadow-sm">
            {/* כותרת העמודה ומונה משימות */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
                <h3 className="text-base font-semibold text-zinc-800 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${
              period === 'morning' ? 'bg-amber-400' : period === 'afternoon' ? 'bg-sky-400' : 'bg-indigo-400'
          }`} />
                    {title}
                </h3>
                <span className="text-xs font-mono bg-zinc-100 text-zinc-500 px-2.5 py-0.5 rounded-full border border-zinc-200">
          {filteredTasks.length}
        </span>
            </div>

            {/* רשימת הכרטיסים */}
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1 scrollbar-thin scrollbar-thumb-zinc-200">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onToggleComplete={onToggleComplete}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 border border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                        <span className="text-xs text-zinc-400 font-medium">אין משימות לזמן זה</span>
                    </div>
                )}
            </div>
        </div>
    );
}