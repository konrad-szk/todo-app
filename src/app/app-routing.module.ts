import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewTodoComponent} from "./pages/new-todo/new-todo.component";
import {EditTodoComponent} from "./pages/edit-todo/edit-todo.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'add',
    component: NewTodoComponent
  },
  {
    path: ':id/edit',
    component: EditTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
