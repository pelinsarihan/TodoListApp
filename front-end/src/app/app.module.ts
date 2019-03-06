import { MemberService } from './services/member.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Route } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { FormsModule } from '@angular/forms';
import { TodolistdetailComponent } from './components/todolistdetail/todolistdetail.component';
import { AuthGuard } from './services/auth.guard';

const routeConfig : Route[] = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'todolist',
    component : TodolistComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'todolistdetail/:todoListName/:id',
    component : TodolistdetailComponent,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TodolistComponent,
    TodolistdetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig), 
    HttpClientModule,
    FormsModule
  ],
  providers: [MemberService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
