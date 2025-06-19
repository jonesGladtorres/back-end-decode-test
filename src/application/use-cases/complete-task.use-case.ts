import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DependencyNotMetError } from 'src/domain/errors/task.errors';
import { TaskRepository } from 'src/domain/repositories/task.repository';

interface CompleteTaskInput {
  taskId: string;
}

@Injectable()
export class CompleteTaskUseCase {
  constructor(
    @Inject('TaskRepository')
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute({ taskId }: CompleteTaskInput): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada.');
    }

    if (task.dependencies && task.dependencies.length > 0) {
      const dependencyTasks = await this.taskRepository.findTasksByIds(
        task.dependencies,
      );

      const allDependenciesMet = dependencyTasks.every(
        (dep) => dep.status === 'concluida',
      );

      if (!allDependenciesMet) {
        throw new DependencyNotMetError(
          'Nem todas as dependências foram concluídas.',
        );
      }
    }

    task.status = 'concluida';
    task.updatedAt = new Date();
    await this.taskRepository.update(task);
  }
}
