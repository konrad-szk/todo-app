export class DeleteTaskCommand {
  constructor(
    public readonly listId: string,
    public readonly taskId: string
  ) {
  }
}
