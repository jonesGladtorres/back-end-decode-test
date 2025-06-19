import { TaskRepository } from 'src/domain/repositories/task.repository';
interface DeleteTaskInput {
    taskId: string;
}
export declare class DeleteTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    execute({ taskId }: DeleteTaskInput): Promise<void>;
}
export {};
