import { TasksData } from "./tasks.interface";

export class Task implements TasksData{
    public readonly id: string;

    constructor(
        id: string,
        public name: string,
        public title: string,
        public description: string,
        public priority: "LOW" | "MEDIUM" | "HIGH",
        public startDate: Date,
        public deadline: Date,
        public estimatedHours: number,
        public status: "IN_PROGRESS" | "DONE",
        public startedAt: Date,
        public updatedAt: Date,
        public statusDelete: "ACTIVE" | "INACTIVE",
    ){
        this.id = id;
    }

    static create(data: Partial<TasksData>):Task{
        const now = new Date();

        return new Task(
            Task.generateId(),
            data.name ?? '',
            data.title ?? '',
            data.description ?? '',
            data.priority ?? "LOW",
            data.startDate ?? now,
            data.deadline ?? now,
            data.estimatedHours ?? 0,
            "IN_PROGRESS",
            now,
            now,
            data.statusDelete ?? "ACTIVE",
        );
    }

    private static generateId(): string{
        return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }

    private static checkOverdue(deadline: string): boolean{
        if(!deadline){
            return false;
        }else{
            return new Date(deadline) < new Date();
        }
    }

    public toggleStatus(): void{
        this.status = this.status === "DONE" ? "IN_PROGRESS" : "DONE";
    }

    public calculatePriority(): "LOW" | "MEDIUM" | "HIGH"{
        const now = new Date();
        const diffInMs = this.deadline.getTime() - this.startDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if(diffInDays > 7){
            return "LOW";
        }else if(diffInDays > 4){
            return "MEDIUM";
        }else{
            return "HIGH";
        }
    }

    public updatePriority(): void{
        this.priority = this.calculatePriority();
    }

    public toggleDelete(): void{
        this.statusDelete = this.statusDelete === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    }

    public updateTask(data: Partial<TasksData>): void{
        if (data.name !== undefined){
            this.name = data.name;
        }

        if (data.title !== undefined){
            this.title = data.title;
        }

        if(data.description !== undefined){
            this.description = data.description;
        }

        if (data.startDate !== undefined){
            this.startDate = data.startDate;
        }

        if (data.deadline !== undefined){
            this.deadline = data.deadline;
            this.priority = this.calculatePriority();
        }

        if (data.estimatedHours !== undefined){
            this.estimatedHours = data.estimatedHours;
        }

        this.updatedAt = new Date();
    }
}