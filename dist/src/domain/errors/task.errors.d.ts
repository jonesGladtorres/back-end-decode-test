export declare class DependencyNotMetError extends Error {
    constructor(message: string);
}
export declare class TaskInUseError extends Error {
    constructor(taskId: string);
}
