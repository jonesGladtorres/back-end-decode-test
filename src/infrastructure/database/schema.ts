import { relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const taskStatusEnum = pgEnum('task_status', ['pendente', 'concluida']);

export const tasks = pgTable('tasks', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  status: taskStatusEnum('status').notNull().default('pendente'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const taskDependencies = pgTable(
  'task_dependencies',
  {
    taskId: text('task_id')
      .notNull()
      .references(() => tasks.id, { onDelete: 'cascade' }),
    dependencyId: text('dependency_id')
      .notNull()
      .references(() => tasks.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.taskId, t.dependencyId] }),
  }),
);

export const tasksRelations = relations(tasks, ({ many }) => ({
  dependencies: many(taskDependencies, {
    relationName: 'task_dependencies',
  }),
  dependents: many(taskDependencies, {
    relationName: 'task_dependents',
  }),
}));

export const taskDependenciesRelations = relations(
  taskDependencies,
  ({ one }) => ({
    task: one(tasks, {
      fields: [taskDependencies.taskId],
      references: [tasks.id],
      relationName: 'task_dependencies',
    }),
    dependency: one(tasks, {
      fields: [taskDependencies.dependencyId],
      references: [tasks.id],
      relationName: 'task_dependents',
    }),
  }),
);
