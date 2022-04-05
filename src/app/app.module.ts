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
import { NewPostComponent } from './project/new-post/new-post.component';

                              
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UserComponent,
    TasksComponent,
    NewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
