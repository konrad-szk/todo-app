import {Injectable} from "@angular/core";
import {ManagesTodoListCommandPort} from "./port/primary/manages-todo-list.command-port";
import {CompleteTaskCommand} from "./port/primary/complete-task.command";
import {BehaviorSubject, Observable, of} from "rxjs";
import {CreateTaskCommand} from "./port/primary/create-task.command";
import {DeleteTaskCommand} from "./port/primary/delete-task.command";
import {UncompleteTaskCommand} from "./port/primary/uncomplete-task.command";
import {TodoList} from "../domain/todo-list";
import {TodoListQuery} from "./port/primary/todo-list.query";

@Injectable()
export class TodoState implements ManagesTodoListCommandPort{

  private _todoLists = new BehaviorSubject<TodoList[]>([]);

  complete(command: CompleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  createTask(command: CreateTaskCommand): Observable<{taskId: string}> {
    return of({taskId: ''});
  }

  createTodoList(command: CreateTaskCommand): Observable<{ listId: string }> {
    return of({listId: ''});
  }

  delete(command: DeleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  uncomplete(command: UncompleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  get(todoId: string): Observable<TodoListQuery> {
    return of();
  }

}
