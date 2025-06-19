import { TaskRepository } from 'src/domain/repositories/task.repository';
interface CreateTaskInput {
    name: string;
    dependencies?: string[];
}
export declare class CreateTaskUseCase {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    execute({ name, dependencies }: CreateTaskInput): Promise<void>;
}
export {};
