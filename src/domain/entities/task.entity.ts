import { randomUUID } from 'node:crypto';

export type TaskStatus = 'pendente' | 'concluida';

export class Task {
  id: string;
  name: string;
  status: TaskStatus;
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;

  private constructor(props: {
    id: string;
    name: string;
    status: TaskStatus;
    dependencies: string[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    Object.assign(this, props);
  }

  public static create(name: string, dependencies: string[] = []): Task {
    return new Task({
      id: randomUUID(),
      name: name,
      status: 'pendente',
      dependencies: dependencies,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static restore(
    id: string,
    name: string,
    status: TaskStatus,
    dependencies: string[],
    createdAt: Date,
    updatedAt: Date,
  ): Task {
    return new Task({
      id,
      name,
      status,
      dependencies,
      createdAt,
      updatedAt,
    });
  }
}
