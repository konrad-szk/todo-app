import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";
import {CreateTaskCommand} from "./create-task.command";
import {DeleteTaskCommand} from "./delete-task.command";
import {CompleteTaskCommand} from "./complete-task.command";
import {UncompleteTaskCommand} from "./uncomplete-task.command";

export const MANAGES_TODO_LIST_COMMAND_PORT = new InjectionToken<ManagesTodoListCommandPort>('MANAGES_TODO_LIST_COMMAND_PORT');

export interface ManagesTodoListCommandPort extends CreatesTodoListCommandPort, DeletesTaskCommandPort, CompletesTaskCommandPort, UncompletesTaskCommandPort, CreatesTaskCommandPort {
}

export interface CreatesTodoListCommandPort {
  createTodoList(command: CreateTaskCommand): Observable<void>
}

export interface CreatesTaskCommandPort {
  createTask(command: CreateTaskCommand): Observable<void>
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
