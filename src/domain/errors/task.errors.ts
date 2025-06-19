export class DependencyNotMetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DependencyNotMetError';
  }
}

export class TaskInUseError extends Error {
  constructor(taskId: string) {
    super(
      `A tarefa ${taskId} não pode ser excluída pois outras tarefas dependem dela.`,
    );
    this.name = 'TaskInUseError';
  }
}
