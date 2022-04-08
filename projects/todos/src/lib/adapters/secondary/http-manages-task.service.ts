import {Inject, Injectable} from "@angular/core";
import {Task, TodoistApi} from "@doist/todoist-api-typescript";
import {TODOIST} from "./todoist.factory";
import {ManagesTaskDtoPort} from "../../application/port/secondary/manages-task.dto-port";
import {from, map, Observable} from "rxjs";
import {TaskDto} from "../../application/port/secondary/task.dto";

@Injectable()
export class HttpManagesTaskService implements ManagesTaskDtoPort{
  constructor(@Inject(TODOIST) private _todoist: TodoistApi) {
  }

  create(desc: string): Observable<TaskDto> {
    return from(this._todoist.addTask({content: desc})).pipe(
      map(this._toDTO)
    );
  }

  close(id: number): Observable<void> {
    return from(this._todoist.closeTask(id)).pipe(
      map(() => void 0)
    );
  }

  delete(id: number): Observable<void> {
    return from(this._todoist.deleteTask(id)).pipe(
      map(() => void 0)
    );
  }

  get(id: number): Observable<TaskDto> {
    return from(this._todoist.getTask(id)).pipe(
      map(this._toDTO)
    );
  }

  getAll(): Observable<TaskDto[]> {
    return from(this._todoist.getTasks()).pipe(
      map((tasks: Task[]) => tasks.map(this._toDTO))
    );
  }

  reopen(id: number): Observable<void> {
    return from(this._todoist.reopenTask(id)).pipe(
      map(() => void 0)
    );
  }

  private _toDTO(task: Task) {
    return {
      id: task.id,
      desc: task.content,
      completed: task.completed
    };
  }
}
