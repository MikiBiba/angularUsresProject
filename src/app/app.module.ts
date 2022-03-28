import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {  RouterModule, Routes  } from "@angular/router";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './project/main/main.component';
import { UsersComponent } from './project/users/users.component';
import { UserComponent } from './project/user/user.component';
import { TasksComponent } from './project/tasks/tasks.component';
import { NewTaskComponent } from './project/new-task/new-task.component';
import { NewPostComponent } from './project/new-post/new-post.component';

const appRoutes : Routes = [ {path : "main", component : MainComponent},
                             {path : "users", component : UsersComponent},
                             {path: "user", component: UserComponent},
                             {path: "tasks/:id", component: TasksComponent},
                             {path: "newPost/:id", component: NewPostComponent},
                             {path: "newTask/:id", component: NewTaskComponent},
                            ]   
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UserComponent,
    TasksComponent,
    NewTaskComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
