import { Injectable } from "@nestjs/common";
import { Task } from "./tasks.model";
import { TasksData, ProjectData, Type, Status } from "./tasks.interface";
import dataFile from '../data/data.json';

@Injectable()
export class TasksService{
    private tasks: Task[] = dataFile as Task[];
    
    createTask(data: Partial<TasksData>): Task{
        const task = Task.create(data);
        this.tasks.push(task);
        return task;
    }

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasks(search?: string, status?: Status): Task[]{
        return this.tasks.filter(task =>
            (!search || task.tasksName.toLowerCase().includes(search.toLowerCase()))
            &&
            (!status || task.status === status)
        );
    }

    updateStatus(taskId: string): Task{
        const task = this.tasks.find(task => task.taskId === taskId);
        if (!task){
            throw new Error("Task not found");
        }

        if (task.status === Status.IN_PROGRESS){
            task.status = Status.DONE;
        } else {
            task.status = Status.IN_PROGRESS;
        }
        return task;
    }
    
}