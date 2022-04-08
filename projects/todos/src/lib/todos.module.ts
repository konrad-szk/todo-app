import {ModuleWithProviders, NgModule} from '@angular/core';
import {
  CREATES_TODO_LIST_COMMAND_PORT,
  MANAGES_TASK_PORT
} from "./application/port/primary/manages-todo-list.command-port";
import {TodoState} from "./application/todo.state";
import {CreateTodoListComponent} from './adapters/primary/create-todo-list/create-todo-list.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {TODOIST_API_KEY} from "./adapters/secondary/todoist-api-key.config";
import {HttpManagesTaskService} from "./adapters/secondary/http-manages-task.service";
import {MANAGES_TASK_DTO_PORT} from "./application/port/secondary/manages-task.dto-port";
import { EditTodoListComponent } from './adapters/primary/edit-todo-list/edit-todo-list.component';
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    CreateTodoListComponent,
    EditTodoListComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    TodoState,
    {
      provide: CREATES_TODO_LIST_COMMAND_PORT,
      useExisting: TodoState
    },
    {
      provide: MANAGES_TASK_PORT,
      useExisting: TodoState
    },
    {
      provide: MANAGES_TASK_DTO_PORT,
      useClass: HttpManagesTaskService
    }],
  exports: [CreateTodoListComponent, EditTodoListComponent]
})
export class TodosModule {

  static forRoot(apiKey: string): ModuleWithProviders<TodosModule>{
    return {
      ngModule:TodosModule,
      providers: [
        {
          provide: TODOIST_API_KEY,
          useValue: apiKey
        }
      ]
    }
  }
}
