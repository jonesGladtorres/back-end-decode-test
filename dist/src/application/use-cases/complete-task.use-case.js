"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteTaskUseCase = void 0;
const common_1 = require("@nestjs/common");
const task_errors_1 = require("../../domain/errors/task.errors");
const task_repository_1 = require("../../domain/repositories/task.repository");
let CompleteTaskUseCase = class CompleteTaskUseCase {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async execute({ taskId }) {
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new common_1.NotFoundException('Tarefa não encontrada.');
        }
        if (task.dependencies && task.dependencies.length > 0) {
            const dependencyTasks = await this.taskRepository.findTasksByIds(task.dependencies);
            const allDependenciesMet = dependencyTasks.every((dep) => dep.status === 'concluida');
            if (!allDependenciesMet) {
                throw new task_errors_1.DependencyNotMetError('Nem todas as dependências foram concluídas.');
            }
        }
        task.status = 'concluida';
        task.updatedAt = new Date();
        await this.taskRepository.update(task);
    }
};
exports.CompleteTaskUseCase = CompleteTaskUseCase;
exports.CompleteTaskUseCase = CompleteTaskUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TaskRepository')),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], CompleteTaskUseCase);
//# sourceMappingURL=complete-task.use-case.js.map