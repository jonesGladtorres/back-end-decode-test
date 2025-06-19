"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDependenciesRelations = exports.tasksRelations = exports.taskDependencies = exports.tasks = exports.taskStatusEnum = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.taskStatusEnum = (0, pg_core_1.pgEnum)('task_status', ['pendente', 'concluida']);
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.text)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    status: (0, exports.taskStatusEnum)('status').notNull().default('pendente'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.taskDependencies = (0, pg_core_1.pgTable)('task_dependencies', {
    taskId: (0, pg_core_1.text)('task_id')
        .notNull()
        .references(() => exports.tasks.id, { onDelete: 'cascade' }),
    dependencyId: (0, pg_core_1.text)('dependency_id')
        .notNull()
        .references(() => exports.tasks.id, { onDelete: 'cascade' }),
}, (t) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [t.taskId, t.dependencyId] }),
}));
exports.tasksRelations = (0, drizzle_orm_1.relations)(exports.tasks, ({ many }) => ({
    dependencies: many(exports.taskDependencies, {
        relationName: 'task_dependencies',
    }),
    dependents: many(exports.taskDependencies, {
        relationName: 'task_dependents',
    }),
}));
exports.taskDependenciesRelations = (0, drizzle_orm_1.relations)(exports.taskDependencies, ({ one }) => ({
    task: one(exports.tasks, {
        fields: [exports.taskDependencies.taskId],
        references: [exports.tasks.id],
        relationName: 'task_dependencies',
    }),
    dependency: one(exports.tasks, {
        fields: [exports.taskDependencies.dependencyId],
        references: [exports.tasks.id],
        relationName: 'task_dependents',
    }),
}));
//# sourceMappingURL=schema.js.map