export class TodoListQuery {
  constructor(
    public readonly listId: string,
    public readonly tasks: TaskQuery[]
  ) {
  }
}

export class TaskQuery {
  constructor(
    public readonly taskId: string,
    public desc: string,
    public isCompleted: boolean
  ) {
  }
}
