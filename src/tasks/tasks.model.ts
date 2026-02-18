import { TasksData, ProjectData, Status, Type } from "./tasks.interface";
import { Injectable } from '@nestjs/common';

export class Task implements TasksData{
    constructor(
        public taskId: string,
        public tasksName: string,
        public startDate: string,
        public deadline: string,
        public status: Status,
        public isOverdue: boolean,
    ){}

    static create(data: Partial<TasksData>): Task{
        return new Task(
            data.taskId || Task.generateId(),
            data.tasksName || '',
            data.startDate || new Date().toISOString(),
            data.deadline || '',
            data.status || Status.IN_PROGRESS,
            data.isOverdue ?? Task.checkOverdue(data.deadline || ''),
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