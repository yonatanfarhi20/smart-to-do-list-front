export type TaskPeriod = 'morning' | 'afternoon' | 'evening';

export interface Task {
    _id: string;
    title: string;
    period: TaskPeriod;
    isCompleted: boolean;
    createdAt: string;
}