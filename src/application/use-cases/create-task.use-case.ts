import { Inject, Injectable } from '@nestjs/common';
import { Task } from 'src/domain/entities/task.entity';
import { TaskRepository } from 'src/domain/repositories/task.repository';

interface CreateTaskInput {
  name: string;
  dependencies?: string[];
}

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute({ name, dependencies }: CreateTaskInput): Promise<void> {
    const task = Task.create(name, dependencies);

    await this.taskRepository.create(task);
  }
}
