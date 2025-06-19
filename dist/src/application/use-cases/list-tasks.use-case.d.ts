import { Task } from 'src/domain/entities/task.entity';
import { TaskRepository } from 'src/domain/repositories/task.repository';
export declare class ListTasksUseCase {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    execute(): Promise<Task[]>;
}
