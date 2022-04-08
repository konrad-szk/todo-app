import {Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
  MANAGES_TASK_PORT,
  ManagesTaskCommandPort
} from "../../../application/port/primary/manages-todo-list.command-port";
import {ActivatedRoute} from "@angular/router";
import {fromEvent, map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {TodoListQuery} from "../../../application/port/primary/todo-list.query";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {CreateTaskCommand} from "../../../application/port/primary/create-task.command";

@Component({
  selector: 'lib-edit-todo-list',
  templateUrl: './edit-todo-list.component.html',
  styleUrls: ['./edit-todo-list.component.css']
})
export class EditTodoListComponent {
  isAddVisible = false;
  @ViewChild('createBtn', { static: true }) button: ElementRef | undefined;
  @ViewChildren('task') private _tasks: QueryList<ElementRef> | undefined;
  private unsub = new Subject<void>();
  public form = this._fb.group({
    desc: new FormControl(undefined, Validators.required)
  })

  tasks$: Observable<TodoListQuery> = this._route.paramMap.pipe(
    switchMap(params => this._managesTasks.get(params.get('id') as string)) //todo move id to input
  )

  constructor(
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    @Inject(MANAGES_TASK_PORT) private _managesTasks: ManagesTaskCommandPort) { }

  ngAfterViewInit(): void {
    this._handleAddTask();
  }

  private _handleAddTask() {
    fromEvent(this.button?.nativeElement, 'click').pipe(
      takeUntil(this.unsub),
      switchMap(() => this._route.paramMap.pipe(map(params => params.get('id') as string))),
      switchMap((listId: string) => this._managesTasks.createTask(new CreateTaskCommand(listId, this.form.get('desc')?.value))),
      tap(() => this.isAddVisible =! this.isAddVisible)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete()
  }
}
