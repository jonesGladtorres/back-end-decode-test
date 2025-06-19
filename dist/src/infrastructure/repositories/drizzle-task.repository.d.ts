import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Task } from 'src/domain/entities/task.entity';
import { TaskRepository } from 'src/domain/repositories/task.repository';
import * as schema from 'src/infrastructure/database/schema';
export declare class DrizzleTaskRepository implements TaskRepository {
    private readonly db;
    constructor(db: NodePgDatabase<typeof schema>);
    create(task: Task): Promise<void>;
    findById(id: string): Promise<Task | null>;
    findAll(): Promise<Task[]>;
    update(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
    findTasksByIds(ids: string[]): Promise<Task[]>;
    findDependentsOf(taskId: string): Promise<Task[]>;
}
