import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewTodoComponent} from './pages/new-todo/new-todo.component';
import {EditTodoComponent} from './pages/edit-todo/edit-todo.component';
import {HomeComponent} from './pages/home/home.component';
import {TodosModule} from "../../projects/todos/src/lib/todos.module";

@NgModule({
  declarations: [
    AppComponent,
    NewTodoComponent,
    EditTodoComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TodosModule.forRoot('ea1933383125c34c2df25e2fc9287a47a96fec75'),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
