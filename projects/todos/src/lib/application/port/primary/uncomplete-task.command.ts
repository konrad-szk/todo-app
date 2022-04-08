export class UncompleteTaskCommand {
  constructor(
    public readonly listId: string,
    public readonly taskId: string
  ) {
  }
}
