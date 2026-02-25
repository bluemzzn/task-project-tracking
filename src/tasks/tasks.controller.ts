import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksData } from "./tasks.interface";
import { CreateTaskDto } from "./dto/create-task.dto";


@Controller("tasks")
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    createTask(@Body() data: CreateTaskDto) {
    return this.tasksService.createTask(data);
    }

    @Get()
    getTasks() {
        return this.tasksService.getAllTasks();
    }

    @Get(":id")
    getTaskById(@Param("id") id: string) {
        return this.tasksService.getTasksById(id);
    }

    @Patch(":id/status")
    updateStatus(@Param("id") id: string) {
        return this.tasksService.updateStatus(id);
    }

    @Patch()
    updateField(
    @Body() tasksData: { id: string; data: Partial<TasksData> }[]
    ) {
    return this.tasksService.updateField(tasksData);
    }

    @Patch(":id/inactive")
    inactive(@Param("id") id: string) {
        return this.tasksService.inactiveField(id);
    }

    @Patch(":id/recovery")
    recovery(@Param("id") id: string) {
        return this.tasksService.recovery(id);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.tasksService.deleteField(id);
    }
}