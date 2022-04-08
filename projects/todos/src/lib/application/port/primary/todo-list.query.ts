import { Task } from "../../../domain/task";
import {TodoList} from "../../../domain/todo-list";

export class TodoListQuery {
  constructor(
    public readonly listId: string,
    public readonly tasks: TaskQuery[]
  ) {
  }
  static fromDomain(todoList: TodoList): TodoListQuery{
    return new TodoListQuery(todoList.uuid, todoList.tasks.map(t => TaskQuery.fromDomain(t)))
  }
}

export class TaskQuery {
  constructor(
    public readonly taskId: string,
    public desc: string,
    public isCompleted: boolean
  ) {
  }

  static fromDomain(task: Task): TaskQuery {
    return new TaskQuery(
      task.uuid,
      task.desc,
      task.isDone
    )
  }
}
