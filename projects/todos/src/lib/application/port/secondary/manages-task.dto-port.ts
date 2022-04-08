import {Observable} from "rxjs";
import {TaskDto} from "./task.dto";
import {InjectionToken} from "@angular/core";

export const MANAGES_TASK_DTO_PORT = new InjectionToken<ManagesTaskDtoPort>('MANAGES_TASK_DTO_PORT')

export interface ManagesTaskDtoPort {
  create(desc: string): Observable<TaskDto>

  get(id: number): Observable<TaskDto>

  getAll(): Observable<TaskDto[]>;

  delete(id: number): Observable<void>

  close(id: number): Observable<void>

  reopen(id: number): Observable<void>
}

