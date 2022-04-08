export class CreateTaskCommand {
  public constructor(
    public readonly listId: string,
    public readonly desc: string
  ) {
  }
}
