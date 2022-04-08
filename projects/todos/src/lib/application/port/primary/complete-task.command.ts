export class CompleteTaskCommand {
  constructor(
    public readonly listId: string,
    public readonly taskId: string
  ) {
  }
}
