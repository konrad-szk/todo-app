import {AfterViewInit, Component, ElementRef, Inject, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subject, switchMap, takeUntil, tap} from "rxjs";
import {
  CREATES_TODO_LIST_COMMAND_PORT,
  CreatesTodoListCommandPort
} from "../../../application/port/primary/manages-todo-list.command-port";
import {CreateTodoListCommand} from "../../../application/port/primary/create-todo-list.command";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'lib-create-todo-list',
  templateUrl: './create-todo-list.component.html',
  styleUrls: ['./create-todo-list.component.scss']
})
export class CreateTodoListComponent implements AfterViewInit, OnDestroy {

  @ViewChild('createBtn', { static: true }) button: ElementRef | undefined;

  private unsub = new Subject<void>();
  public form = this._fb.group({
    desc: new FormControl(undefined, Validators.required)
  })
  constructor(
    private _fb: FormBuilder,
    @Inject(CREATES_TODO_LIST_COMMAND_PORT) private _todoListFactory: CreatesTodoListCommandPort
  ) { }

  ngAfterViewInit(): void {
    this._handleAddTask();
  }

  private _handleAddTask() {
    fromEvent(this.button?.nativeElement, 'click').pipe(
      takeUntil(this.unsub),
      switchMap(() => this._todoListFactory.createTodoList(new CreateTodoListCommand(this.form.get('desc')?.value)))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.unsub.next();
    this.unsub.complete()
  }
}
