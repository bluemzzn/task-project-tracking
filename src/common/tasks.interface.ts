export enum Type {
  TASKS = "tasks",
  PROJECT = "projects",
}

export enum Status {
  DONE = "done",
  IN_PROGRESS = "in_progress",
}

export enum projectStatus {
  Planning = "Planning",
  Completed = "Completed",
  Archived = "Archived",
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
    status: "IN_PROGRESS" | "DONE",
    startedAt: Date,
    updatedAt: Date,
    statusDelete: "ACTIVE" | "INACTIVE",
}

export interface ProjectData {
  type: Type.PROJECT;
  name: string;
  id: number;
  title: string;
  description: string;
  status: projectStatus;
  startAt: Date;
  deadline: Date;
  createdAt : Date;
  updatedAt : Date;
  statusDelete: "ACTIVE" | "INACTIVE"
  subTasks: TasksData[];
}
