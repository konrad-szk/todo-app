import {Task} from "./task";

export class TodoList {

  constructor(
    public tasks : Task[] = [],
    public readonly uuid: string = crypto.randomUUID(), // node14.17+
  ) {
  }

  get isComplete() {
    return !this.tasks.some(task => !task.idDone())
  }
}
