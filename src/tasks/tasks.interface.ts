export enum Type{
    TASKS = 'tasks',
    PROJECT = 'projects',
}

export interface TasksData{
    name: string,
    id: string,
    title: string,
    description: string,
    priority: "LOW" | "MEDIUM" | "HIGH",
    startDate: Date,
    deadline: Date,
    estimatedHours: number,
    status: "TODO" | "IN_PROGRESS" | "DONE" | "CANCELED",
    startedAt: Date,
    updatedAt: Date,
    statusDelete: "ACTIVE" | "INACTIVE",
}