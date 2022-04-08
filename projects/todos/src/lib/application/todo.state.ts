import {Injectable} from "@angular/core";
import {ManagesTaskCommandPort, CreatesTodoListCommandPort} from "./port/primary/manages-todo-list.command-port";
import {CompleteTaskCommand} from "./port/primary/complete-task.command";
import {BehaviorSubject, defer, empty, Observable, of, tap, throwError} from "rxjs";
import {CreateTaskCommand} from "./port/primary/create-task.command";
import {DeleteTaskCommand} from "./port/primary/delete-task.command";
import {UncompleteTaskCommand} from "./port/primary/uncomplete-task.command";
import {TodoList} from "../domain/todo-list";
import {TodoListQuery} from "./port/primary/todo-list.query";
import {Router} from "@angular/router";

@Injectable()
export class TodoState implements ManagesTaskCommandPort, CreatesTodoListCommandPort {

  private _todoLists = new BehaviorSubject<TodoList[]>([]);

  constructor(private router: Router) {
  }

  createTodoList(command: CreateTaskCommand): Observable<{ listId: string }> {
    return defer(() => { // todo make own operator to reduce boilerplate
      try {
        return this._createNewTodoList(command.desc);
      } catch (e) {
        return throwError(() => e)
      }
    })
  }

  complete(command: CompleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  createTask(command: CreateTaskCommand): Observable<{ taskId: string }> {
    return of({taskId: ''});
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


  private _createNewTodoList(desc: string) {
    const todoList = TodoList.fromTask(desc);
    this._todoLists.next([...this._todoLists.value, todoList])
    return of({listId: todoList.uuid}).pipe(
      tap(() => this.router.navigate([todoList.uuid, 'edit']))
    )
  }
}
