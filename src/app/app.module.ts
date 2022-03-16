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

const appRoutes : Routes = [ {path : "main", component : MainComponent},
                             {path : "users", component : UsersComponent},
                              {path: "user/:id", component: UserComponent}    ]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UsersComponent,
    UserComponent,
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
