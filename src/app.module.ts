import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [],
})
export class AppModule {}
