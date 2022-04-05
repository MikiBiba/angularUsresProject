import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './project/main/main.component';
import { UsersComponent } from './project/users/users.component';
import { UserComponent } from './project/user/user.component';
import { TasksComponent } from './project/tasks/tasks.component';
import { ExampleComponent } from './project/example/example.component';
import { NewPostComponent } from './project/new-post/new-post.component';
import { NewTaskComponent } from './project/new-task/new-task.component';

const routes: Routes = [
                              {path : "main", component : MainComponent},
                             {path : "users", component : UsersComponent},
                             {path: "user", component: UserComponent},
                             {path:"tasks/:id", component:TasksComponent},
                             {path: "newPost/:id", component: NewPostComponent},
                             {path: "newTask/:id", component: NewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
