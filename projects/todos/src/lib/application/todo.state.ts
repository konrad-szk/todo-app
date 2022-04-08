import {Inject, Injectable} from "@angular/core";
import {ManagesTaskCommandPort, CreatesTodoListCommandPort} from "./port/primary/manages-todo-list.command-port";
import {CompleteTaskCommand} from "./port/primary/complete-task.command";
import {BehaviorSubject, defer, filter, from, map, mapTo, Observable, of, switchMap, tap, throwError} from "rxjs";
import {CreateTaskCommand} from "./port/primary/create-task.command";
import {DeleteTaskCommand} from "./port/primary/delete-task.command";
import {UncompleteTaskCommand} from "./port/primary/uncomplete-task.command";
import {TodoList} from "../domain/todo-list";
import {TodoListQuery} from "./port/primary/todo-list.query";
import {Router} from "@angular/router";
import {MANAGES_TASK_DTO_PORT, ManagesTaskDtoPort} from "./port/secondary/manages-task.dto-port";
import {TaskDto} from "./port/secondary/task.dto";
import {Task} from "../domain/task";

@Injectable()
export class TodoState implements ManagesTaskCommandPort, CreatesTodoListCommandPort {

  private _todoLists = new BehaviorSubject<TodoList[]>([]);

  constructor(private router: Router,
              @Inject(MANAGES_TASK_DTO_PORT) private _managesTaskDtoPort: ManagesTaskDtoPort) {
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
    return this._todoLists.asObservable().pipe(
      switchMap(todos => from(todos)),
      filter(todo => todo.uuid === todoId),
      map(todo => TodoListQuery.fromDomain(todo))
    );
  }

  private _createNewTodoList(desc: string): Observable<{ listId: string }> {
    // fixme IF TODOIST WOULD BE NORMAL API
    // const todoList = TodoList.fromTask(desc);
    // this._todoLists.next([...this._todoLists.value, todoList])
    // return this._managesTaskDtoPort.create(taskId, desc).pipe(
    //   tap(() => this.router.navigate([todoList.uuid, 'edit']))
    // )
    const todoList = new TodoList();
    return this._managesTaskDtoPort.create(desc).pipe(
      map((dto: TaskDto) => new Task(dto.desc, dto.completed, dto.id)),
      tap((task: Task) => todoList.addTask(task)),
      tap(() => this._todoLists.next([...this._todoLists.value, todoList])),
      mapTo({listId: todoList.uuid}),
      tap(({listId}) => this.router.navigate([listId, 'edit']))
    )
  }
}
