import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer() {
    const WORK_TIME = 25 * 60; // 25 דקות בשניות
    const BREAK_TIME = 5 * 60; // 5 דקות בשניות

    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        const nextMode = !isBreak;
                        setIsBreak(nextMode);
                        setIsActive(false);
                        return nextMode ? BREAK_TIME : WORK_TIME;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, isBreak]);

    // פורמט תצוגת הזמן (MM:SS)
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);

    const handleReset = () => {
        setIsActive(false);
        setIsBreak(false);
        setTimeLeft(WORK_TIME);
    };

    // חישוב אחוז ההתקדמות עבור ה-Progress Bar
    const totalSeconds = isBreak ? BREAK_TIME : WORK_TIME;
    const progressPercentage = ((totalSeconds - timeLeft) / totalSeconds) * 100;

    return (
        <div className="flex flex-col items-center justify-center bg-white border border-zinc-200 p-6 rounded-2xl w-full sm:max-w-xs text-center shadow-sm">
            {/* תגית המצב הנוכחי */}
            <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-4 ${
                isBreak
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
        {isBreak ? '☕ זמן הפסקה' : '🎯 זמן עבודה'}
      </span>

            {/* תצוגת השעון */}
            <div className="text-5xl font-mono font-bold text-zinc-800 select-none tracking-tight mb-2">
                {formatTime(timeLeft)}
            </div>

            {/* פס התקדמות (Progress Bar) */}
            <div className="w-full h-1 bg-zinc-100 rounded-full mb-6 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-linear ${isBreak ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>

            {/* כפתורי שליטה */}
            <div className="flex items-center gap-2 w-full">
                {!isActive ? (
                    <button
                        onClick={handleStart}
                        className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm py-2 rounded-xl transition-colors"
                    >
                        הפעלה
                    </button>
                ) : (
                    <button
                        onClick={handleStop}
                        className="flex-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-medium text-sm py-2 rounded-xl transition-colors shadow-sm"
                    >
                        עצירה
                    </button>
                )}

                <button
                    onClick={handleReset}
                    className="p-2 text-zinc-400 hover:text-zinc-600 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-xl transition-colors shadow-sm"
                    aria-label="איפוס טיימר"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
            </div>
        </div>
    );
}