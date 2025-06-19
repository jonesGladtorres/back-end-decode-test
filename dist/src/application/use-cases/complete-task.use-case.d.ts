import { TaskRepository } from 'src/domain/repositories/task.repository';
interface CompleteTaskInput {
    taskId: string;
}
export declare class CompleteTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    execute({ taskId }: CompleteTaskInput): Promise<void>;
}
export {};
