import {Task} from "./task";

export class TodoList {

  constructor(
    public tasks : Task[] = [],
    public readonly uuid: string = crypto.randomUUID(), // node14.17+
  ) {
  }

  get isComplete() {
    return !this.tasks.some(task => !task.isDone)
  }

  addTask(task: Task){
    this.tasks.push(task);
  }
  static fromTask(desc: string) {
    return new TodoList([new Task(desc)])
  }
}
