import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {CreateTaskCommand} from "./create-task.command";
import {DeleteTaskCommand} from "./delete-task.command";
import {CompleteTaskCommand} from "./complete-task.command";
import {UncompleteTaskCommand} from "./uncomplete-task.command";
import {CreateTodoListCommand} from "./create-todo-list.command";
import {TodoListQuery} from "./todo-list.query";

export const CREATES_TODO_LIST_COMMAND_PORT = new InjectionToken<CreatesTodoListCommandPort>('CREATES_TASK_COMMAND_PORT');
export const MANAGES_TASK_PORT = new InjectionToken<ManagesTaskCommandPort>('MANAGES_TASK_PORT');


export interface ManagesTaskCommandPort extends DeletesTaskCommandPort, CompletesTaskCommandPort, UncompletesTaskCommandPort, CreatesTaskCommandPort, GetsTodoList{

}
export interface CreatesTodoListCommandPort {
  createTodoList(command: CreateTodoListCommand): Observable<{ listId: string }>
}

export interface CreatesTaskCommandPort {
  createTask(command: CreateTaskCommand): Observable<{taskId: string}>
}

export interface DeletesTaskCommandPort {
  delete(command: DeleteTaskCommand): Observable<void>
}

export interface CompletesTaskCommandPort {
  complete(command: CompleteTaskCommand): Observable<void>
}

export interface UncompletesTaskCommandPort {
  uncomplete(command: UncompleteTaskCommand): Observable<void>;
}

export interface GetsTodoList {
  get(todoId: string): Observable<TodoListQuery>
}
