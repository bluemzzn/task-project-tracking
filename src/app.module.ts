import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects/projects.controller";
import { DatabaseService } from "./projects/database.service";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";

@Module({
  imports: [],
  controllers: [TasksController, ProjectsController],
  providers: [TasksService, ProjectsController, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
