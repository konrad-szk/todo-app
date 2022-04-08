import {Task} from "./task";

export class TodoList {

  constructor(
    public tasks: Task[] = [],
    public readonly uuid: string = crypto.randomUUID(), // node14.17+
  ) {
  }

  get isComplete() {
    return !this.tasks.some(task => !task.isDone)
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(task: Task) {
    this._checkExisting(task);
    this.tasks = this.tasks.filter(t => t.id === task.id)
  }

  do(task: Task) {
    this._checkExisting(task);
    this.tasks = this.tasks.filter(t => t.id === task.id);
    task.do();
    this.addTask(task);
  }

  undo(task: Task) {
    this._checkExisting(task);
    this.tasks = this.tasks.filter(t => t.id === task.id);
    task.undo();
    this.addTask(task);
  }

  private _checkExisting(task: Task) {
    if (!this.tasks.includes(task)) {
      throw new Error("Task doesn't exist")
    }
  }

  static fromTask(desc: string) {
    return new TodoList([new Task(desc)])
  }
}
