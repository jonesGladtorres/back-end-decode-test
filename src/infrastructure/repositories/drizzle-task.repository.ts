import { Inject, Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Task, TaskStatus } from 'src/domain/entities/task.entity';
import { TaskRepository } from 'src/domain/repositories/task.repository';
import * as schema from 'src/infrastructure/database/schema';

@Injectable()
export class DrizzleTaskRepository implements TaskRepository {
  constructor(
    @Inject('DRIZZLE_INSTANCE')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(task: Task): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.insert(schema.tasks).values({
        id: task.id,
        name: task.name,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });

      if (task.dependencies && task.dependencies.length > 0) {
        const dependencyRecords = task.dependencies.map((depId) => ({
          taskId: task.id,
          dependencyId: depId,
        }));
        await tx.insert(schema.taskDependencies).values(dependencyRecords);
      }
    });
  }

  async findById(id: string): Promise<Task | null> {
    const result = await this.db.query.tasks.findFirst({
      where: eq(schema.tasks.id, id),
      with: {
        dependencies: {
          columns: {
            dependencyId: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    return Task.restore(
      result.id,
      result.name,
      result.status as TaskStatus,
      result.dependencies.map((d) => d.dependencyId),
      result.createdAt,
      result.updatedAt,
    );
  }

  async findAll(): Promise<Task[]> {
    const results = await this.db.query.tasks.findMany({
      with: {
        dependencies: {
          columns: {
            dependencyId: true,
          },
        },
      },
    });

    return results.map((result) =>
      Task.restore(
        result.id,
        result.name,
        result.status as TaskStatus,
        result.dependencies.map((d) => d.dependencyId),
        result.createdAt,
        result.updatedAt,
      ),
    );
  }

  async update(task: Task): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx
        .update(schema.tasks)
        .set({
          name: task.name,
          status: task.status,
          updatedAt: new Date(),
        })
        .where(eq(schema.tasks.id, task.id));

      await tx
        .delete(schema.taskDependencies)
        .where(eq(schema.taskDependencies.taskId, task.id));

      if (task.dependencies && task.dependencies.length > 0) {
        const dependencyRecords = task.dependencies.map((depId) => ({
          taskId: task.id,
          dependencyId: depId,
        }));
        await tx.insert(schema.taskDependencies).values(dependencyRecords);
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(schema.tasks).where(eq(schema.tasks.id, id));
  }

  async findTasksByIds(ids: string[]): Promise<Task[]> {
    if (ids.length === 0) {
      return [];
    }
    const results = await this.db.query.tasks.findMany({
      where: inArray(schema.tasks.id, ids),
      with: {
        dependencies: {
          columns: {
            dependencyId: true,
          },
        },
      },
    });

    return results.map((result) =>
      Task.restore(
        result.id,
        result.name,
        result.status as TaskStatus,
        result.dependencies.map((d) => d.dependencyId),
        result.createdAt,
        result.updatedAt,
      ),
    );
  }

  async findDependentsOf(taskId: string): Promise<Task[]> {
    const dependentLinks = await this.db.query.taskDependencies.findMany({
      where: eq(schema.taskDependencies.dependencyId, taskId),
    });

    const dependentIds = dependentLinks.map((link) => link.taskId);

    if (dependentIds.length === 0) {
      return [];
    }

    return this.findTasksByIds(dependentIds);
  }
}
