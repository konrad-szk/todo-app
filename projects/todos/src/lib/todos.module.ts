import {NgModule} from '@angular/core';
import {
  CREATES_TODO_LIST_COMMAND_PORT,
  MANAGES_TASK_COMMAND_PORT
} from "./application/port/primary/manages-todo-list.command-port";
import {TodoState} from "./application/todo.state";
import {CreateTodoListComponent} from './adapters/primary/create-todo-list/create-todo-list.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateTodoListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoState,
    {
      provide: CREATES_TODO_LIST_COMMAND_PORT,
      useExisting: TodoState
    },
    {
      provide: MANAGES_TASK_COMMAND_PORT,
      useExisting: TodoState
    }],
  exports: [CreateTodoListComponent]
})
export class TodosModule {
}
