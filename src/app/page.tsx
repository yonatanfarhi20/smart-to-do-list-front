'use client';

import { useEffect, useState } from 'react';
import { Task, TaskPeriod } from '@/types/task';
import { taskService } from '@/services/taskService';
import AddTaskForm from '@/components/AddTaskForm';
import DailyColumn from '@/components/DailyColumn';
import PomodoroTimer from '@/components/PomodoroTimer';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // טעינת משימות ראשונית מה-Backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const data = await taskService.getTasks();
        setTasks(data);
      } catch (err) {
        setError('שגיאה בטעינת המשימות מהשרת');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // הוספת משימה חדשה
  const handleAddTask = async (title: string, period: TaskPeriod) => {
    try {
      const newTask = await taskService.createTask(title, period);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      alert('נכשלה יצירת המשימה');
    }
  };

  // עדכון סטטוס ביצוע (V)
  const handleToggleComplete = async (id: string) => {
    const taskToUpdate = tasks.find((t) => t._id === id);
    if (!taskToUpdate) return;

    try {
      const updatedTask = await taskService.updateTaskStatus(id, !taskToUpdate.isCompleted);
      setTasks((prev) =>
          prev.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (err) {
      alert('עדכון הסטטוס נכשל');
    }
  };

  // מחיקת משימה
  const handleDeleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      alert('מחיקת המשימה נכשלה');
    }
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-50 text-zinc-500 font-medium text-sm">
          טוען מערכת...
        </div>
    );
  }

  return (
      <main className="min-h-screen bg-zinc-50 text-zinc-800 p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* כותרת הדשבורד */}
          <header className="flex flex-col gap-1 py-4 border-b border-zinc-200">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">יומן משימות חכם</h1>
            <p className="text-xs text-zinc-500">ניהול לוז יומי מודולרי מבוסס פומודורו</p>
          </header>

          {/* אזור עליון: טופס הוספה וטיימר */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex-1 w-full">
              <AddTaskForm onAddTask={handleAddTask} />
            </div>
            <PomodoroTimer />
          </div>

          {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
                {error}
              </div>
          )}

          {/* שלוש עמודות זמני היום */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <DailyColumn
                title="בוקר"
                period="morning"
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
            />
            <DailyColumn
                title="צהריים"
                period="afternoon"
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
            />
            <DailyColumn
                title="ערב"
                period="evening"
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
            />
          </div>

        </div>
      </main>
  );
}