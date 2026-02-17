export enum Type {
  TASKS = "tasks",
  PROJECT = "projects",
}

export type projectStatus = "Plainning" | "Completed" | "Archived";

export class CreateProjectDto implements ProjectData {
  IsEnum();
  type: Type.PROJECT;
  name: string;
  id: number;
  title: string;
  description: string;
  status: projectStatus;
  startAt: string;
  deadline: string;
  isOverdue: boolean;
  subTasks: TasksData[];
}
