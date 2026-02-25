import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { ProjectsController } from './projects/projects.controller';
import { TasksService } from './tasks/tasks.service';
import { DatabaseService } from './projects/database.service';

@Module({
  imports: [],
  controllers: [TasksController, ProjectsController],
  providers: [TasksService, ProjectsController, DatabaseService],
  exports: [DatabaseService],
})
export class AppModule {}
