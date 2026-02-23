import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./tasks.model";
import { TasksData } from "./tasks.interface";
import dataFile from "../data/data.json";
import { CreateTaskDto } from "./dto/create-task.dto";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class TasksService {

    private tasks: Task[] = (dataFile as any[]).map(data =>
        new Task(
            data.id,
            data.name,
            data.title,
            data.description,
            data.priority,
            new Date(data.startDate),
            new Date(data.deadline),
            data.estimatedHours,
            data.status,
            new Date(data.startedAt),
            new Date(data.updatedAt),
            data.statusDelete,
        )
    );

    private readonly filePath = path.join(__dirname, "../data/data.json");

    createTask(data: CreateTaskDto): Task {
        const task = Task.create({
            ...data,
            startDate: new Date(data.startDate),
            deadline: new Date(data.deadline),
        });

        this.tasks.push(task);
        this.saveToFile();
        return task;
    }

    getAllTasks(): Task[] {
        return this.tasks.filter(task => task.statusDelete === "ACTIVE");
    }

    getTasksById(taskId: string): Task {
        const task = this.tasks.find(
            task => task.id === taskId && task.statusDelete === "ACTIVE"
        );

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        return task;
    }

    getTasks(search?: string, status?: "IN_PROGRESS" | "DONE"): Task[] {
        return this.tasks.filter(task =>
            task.statusDelete === "ACTIVE" &&
            (!search || task.name.toLowerCase().includes(search.toLowerCase())) &&
            (!status || task.status === status)
        );
    }

    updateStatus(taskId: string): Task {
        const task = this.tasks.find(
            task => task.id === taskId && task.statusDelete === "ACTIVE"
        );

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        task.toggleStatus();
        this.saveToFile();
        return task;
    }

    updateField(tasksData: { id: string; data: Partial<TasksData> }[]): Task[] {
        const updatedTasks = tasksData.map(item => {
            const task = this.tasks.find(
                t => t.id === item.id && t.statusDelete === "ACTIVE"
            );

            if (!task) {
                throw new NotFoundException(`Task ${item.id} not found`);
            }

            task.updateTask(item.data);
            return task;
        });

        this.saveToFile();
        return updatedTasks;
    }

    inactiveField(taskId: string): Task {
        const task = this.tasks.find(task => task.id === taskId);

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        if (task.statusDelete === "INACTIVE") {
            throw new NotFoundException("Task already inactive");
        }

        task.toggleDelete();
        this.saveToFile();
        return task;
    }

    recovery(taskId: string): Task {
        const task = this.tasks.find(task => task.id === taskId);

        if (!task) {
            throw new NotFoundException("Task not found");
        }

        if (task.statusDelete !== "INACTIVE") {
            throw new NotFoundException("Task is not deleted");
        }

        task.toggleDelete();
        this.saveToFile();
        return task;
    }

    deleteField(taskId: string): Task {
        const index = this.tasks.findIndex(t => t.id === taskId);

        if (index === -1) {
            throw new NotFoundException("Task not found");
        }

        const deletedTask = this.tasks[index];
        this.tasks.splice(index, 1);

        this.saveToFile();
        return deletedTask;
    }

    private saveToFile(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks, null, 2));
    }
}