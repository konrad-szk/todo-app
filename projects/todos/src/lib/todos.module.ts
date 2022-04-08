import {NgModule} from '@angular/core';
import {MANAGES_TODO_LIST_COMMAND_PORT} from "./application/port/primary/manages-todo-list.command-port";
import {TodoState} from "./application/todo.state";


@NgModule({
  declarations: [],
  imports: [],
  providers: [{
    provide: MANAGES_TODO_LIST_COMMAND_PORT,
    useClass: TodoState
  }],
  exports: []
})
export class TodosModule {
}
