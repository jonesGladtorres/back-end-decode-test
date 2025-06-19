"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_controller_1 = require("./controllers/tasks.controller");
const create_task_use_case_1 = require("../../application/use-cases/create-task.use-case");
const list_tasks_use_case_1 = require("../../application/use-cases/list-tasks.use-case");
const complete_task_use_case_1 = require("../../application/use-cases/complete-task.use-case");
const delete_task_use_case_1 = require("../../application/use-cases/delete-task.use-case");
const drizzle_task_repository_1 = require("../../infrastructure/repositories/drizzle-task.repository");
const database_module_1 = require("../../infrastructure/database/database.module");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [tasks_controller_1.TasksController],
        providers: [
            create_task_use_case_1.CreateTaskUseCase,
            list_tasks_use_case_1.ListTasksUseCase,
            complete_task_use_case_1.CompleteTaskUseCase,
            delete_task_use_case_1.DeleteTaskUseCase,
            {
                provide: 'TaskRepository',
                useClass: drizzle_task_repository_1.DrizzleTaskRepository,
            },
        ],
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map