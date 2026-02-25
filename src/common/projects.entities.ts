import { ProjectData, projectStatus, TasksData, Type } from "@/tasks/tasks.interface";

export class ProjectEntities implements ProjectData{
    constructor(
        public type: Type.PROJECT,
        public name: string,
        public id: string,
        public title : string,
        public description : string,
        public status : projectStatus,
        public startAt: string,
        public deadline: string,
        public isOverdue: boolean,
        public subTasks: TasksData[]
    ){}

    static create(data : Partial<ProjectData>) : ProjectEntities{
        return new ProjectEntities(
            Type.PROJECT,
            data.name || '',
            data.id || ProjectEntities.generateId(),
            data.title || '',
            data.description || '',
            data.status || projectStatus.Planning,
            data.startAt || '',
            data.deadline || '',
            data.isOverdue ?? false,
            data.subTasks || []
            );
    }

      private static generateId(): string{
        return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

     private static checkOverdue(deadline: string): boolean{
        if(!deadline){
            return false;
        }else{
            return new Date(deadline) < new Date();
        }
    }

}