import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskInUseError } from 'src/domain/errors/task.errors';
import { TaskRepository } from 'src/domain/repositories/task.repository';

interface DeleteTaskInput {
  taskId: string;
}

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute({ taskId }: DeleteTaskInput): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    const dependents = await this.taskRepository.findDependentsOf(taskId);
    if (dependents.length > 0) {
      throw new TaskInUseError(taskId);
    }

    await this.taskRepository.delete(taskId);
  }
}
