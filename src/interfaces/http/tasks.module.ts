import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { CreateTaskUseCase } from 'src/application/use-cases/create-task.use-case';
import { ListTasksUseCase } from 'src/application/use-cases/list-tasks.use-case';
import { CompleteTaskUseCase } from 'src/application/use-cases/complete-task.use-case';
import { DeleteTaskUseCase } from 'src/application/use-cases/delete-task.use-case';
import { DrizzleTaskRepository } from 'src/infrastructure/repositories/drizzle-task.repository';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    ListTasksUseCase,
    CompleteTaskUseCase,
    DeleteTaskUseCase,
    {
      provide: 'TaskRepository',
      useClass: DrizzleTaskRepository,
    },
  ],
})
export class TasksModule {}
