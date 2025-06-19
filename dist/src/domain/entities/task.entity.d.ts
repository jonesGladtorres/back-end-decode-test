export type TaskStatus = 'pendente' | 'concluida';
export declare class Task {
    id: string;
    name: string;
    status: TaskStatus;
    dependencies: string[];
    createdAt: Date;
    updatedAt: Date;
    private constructor();
    static create(name: string, dependencies?: string[]): Task;
    static restore(id: string, name: string, status: TaskStatus, dependencies: string[], createdAt: Date, updatedAt: Date): Task;
}
