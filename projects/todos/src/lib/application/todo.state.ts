import {Injectable} from "@angular/core";
import {ManagesTodoListCommandPort} from "./port/primary/manages-todo-list.command-port";
import {CompleteTaskCommand} from "./port/primary/complete-task.command";
import {Observable, of} from "rxjs";
import {CreateTaskCommand} from "./port/primary/create-task.command";
import {DeleteTaskCommand} from "./port/primary/delete-task.command";
import {UncompleteTaskCommand} from "./port/primary/uncomplete-task.command";

@Injectable()
export class TodoState implements ManagesTodoListCommandPort{
  complete(command: CompleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  createTask(command: CreateTaskCommand): Observable<void> {
    return of(void 0);
  }

  createTodoList(command: CreateTaskCommand): Observable<void> {
    return of(void 0);
  }

  delete(command: DeleteTaskCommand): Observable<void> {
    return of(void 0);
  }

  uncomplete(command: UncompleteTaskCommand): Observable<void> {
    return of(void 0);
  }

}
