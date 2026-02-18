export enum Type{
    TASKS = 'tasks',
    PROJECT = 'projects',
}

export enum Status{
    DONE = 'done',
    IN_PROGRESS = 'in_progress',
}

export interface TasksData{
    taskId: string,
    tasksName: string,
    startDate: string,
    deadline: string,
    status: Status,
    isOverdue: boolean,
}

export interface ProjectData{
    projectName: string,
    projectId: string,
    type: Type,
    subTasks: TasksData[],
    projectStartDate: string,
    projectDeadline: string,
    projectStatus: number,
    isProjectOverdue: boolean,
}