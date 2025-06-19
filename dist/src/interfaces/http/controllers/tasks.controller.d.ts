import { CreateTaskUseCase } from 'src/application/use-cases/create-task.use-case';
import { ListTasksUseCase } from 'src/application/use-cases/list-tasks.use-case';
import { CompleteTaskUseCase } from 'src/application/use-cases/complete-task.use-case';
import { DeleteTaskUseCase } from 'src/application/use-cases/delete-task.use-case';
import { CreateTaskDto } from '../dtos/create-task.dto';
export declare class TasksController {
    private readonly createTaskUseCase;
    private readonly listTasksUseCase;
    private readonly completeTaskUseCase;
    private readonly deleteTaskUseCase;
    constructor(createTaskUseCase: CreateTaskUseCase, listTasksUseCase: ListTasksUseCase, completeTaskUseCase: CompleteTaskUseCase, deleteTaskUseCase: DeleteTaskUseCase);
    create(createTaskDto: CreateTaskDto): Promise<void>;
    findAll(): Promise<import("../../../domain/entities/task.entity").Task[]>;
    complete(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
