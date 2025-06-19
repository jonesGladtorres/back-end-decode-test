import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/domain/entities/task.entity';
import { TaskRepository } from 'src/domain/repositories/task.repository';

@Injectable()
export class ListTasksUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
