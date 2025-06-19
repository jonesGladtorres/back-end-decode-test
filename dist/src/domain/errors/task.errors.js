"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskInUseError = exports.DependencyNotMetError = void 0;
class DependencyNotMetError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DependencyNotMetError';
    }
}
exports.DependencyNotMetError = DependencyNotMetError;
class TaskInUseError extends Error {
    constructor(taskId) {
        super(`A tarefa ${taskId} não pode ser excluída pois outras tarefas dependem dela.`);
        this.name = 'TaskInUseError';
    }
}
exports.TaskInUseError = TaskInUseError;
//# sourceMappingURL=task.errors.js.map