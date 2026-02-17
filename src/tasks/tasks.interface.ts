export enum Type{
    TASKS = 'tasks',
    PROJECT = 'projects',
}

export enum Status{
    DONE = 'done',
    IN_PROGRESS = 'in_progress',
}

export type projectStatus = 'Plaining' | 'Completed' | 'Archived';

export interface TasksData{
    taskId: string,
    tasksName: string,
    startDate: string,
    deadline: string,
    status: Status,
    isOverdue: boolean,
}

export interface ProjectData{
    type: Type.PROJECT;
    name: string;
    id: number;
    title : string;
    description : string;
    status : projectStatus;
    startAt: string;
    deadline: string;
    isOverdue: boolean;
    subTasks: TasksData[];
}