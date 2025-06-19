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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const create_task_use_case_1 = require("../../../application/use-cases/create-task.use-case");
const list_tasks_use_case_1 = require("../../../application/use-cases/list-tasks.use-case");
const complete_task_use_case_1 = require("../../../application/use-cases/complete-task.use-case");
const delete_task_use_case_1 = require("../../../application/use-cases/delete-task.use-case");
const create_task_dto_1 = require("../dtos/create-task.dto");
let TasksController = class TasksController {
    createTaskUseCase;
    listTasksUseCase;
    completeTaskUseCase;
    deleteTaskUseCase;
    constructor(createTaskUseCase, listTasksUseCase, completeTaskUseCase, deleteTaskUseCase) {
        this.createTaskUseCase = createTaskUseCase;
        this.listTasksUseCase = listTasksUseCase;
        this.completeTaskUseCase = completeTaskUseCase;
        this.deleteTaskUseCase = deleteTaskUseCase;
    }
    async create(createTaskDto) {
        return this.createTaskUseCase.execute(createTaskDto);
    }
    async findAll() {
        return this.listTasksUseCase.execute();
    }
    async complete(id) {
        return this.completeTaskUseCase.execute({ taskId: id });
    }
    async remove(id) {
        return this.deleteTaskUseCase.execute({ taskId: id });
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "complete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [create_task_use_case_1.CreateTaskUseCase,
        list_tasks_use_case_1.ListTasksUseCase,
        complete_task_use_case_1.CompleteTaskUseCase,
        delete_task_use_case_1.DeleteTaskUseCase])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map