import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<void>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(): Promise<Task[]>;
  abstract update(task: Task): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findTasksByIds(ids: string[]): Promise<Task[]>;
  abstract findDependentsOf(taskId: string): Promise<Task[]>;
}
