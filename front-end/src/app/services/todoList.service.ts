import { TodoList } from './../models/todoList';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListDetail } from '../models/todoListDetail';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private readonly apiUrl = 'http://localhost:8080/todo';

  constructor(private http : HttpClient, private route : ActivatedRoute, private router : Router) { }

  headers : HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer '+localStorage.getItem('token'));

  PostTodoList(obj : TodoList){
    return this.http.post(this.apiUrl+'/addTodoList', obj, {headers : this.headers});
  }

  GetAllTodoList(id : number){
    return this.http.get(this.apiUrl+'/getTodoList/'+id, {headers : this.headers});
  }

  DeleteTodoList(id : number){
    return this.http.delete(this.apiUrl+'/deleteTodoList/'+id, {headers : this.headers});
  }

  GetAllTodoListItem(id : number){
    return this.http.get(this.apiUrl+'/getTodoListItems/'+id, {headers : this.headers});
  }

  PostTodo(obj : TodoListDetail){
    return this.http.post(this.apiUrl+'/addTodo', obj, {headers : this.headers});
  }

  GetAllTodo(id : number){
    return this.http.get(this.apiUrl+'/getTodo/'+id, {headers : this.headers});
  }

  UpdateTodo(todo : TodoListDetail){
    return this.http.put(this.apiUrl+'/updateTodo',todo, {headers : this.headers});
  }

  DeleteTodo(id : number){
    return this.http.delete(this.apiUrl+'/deleteTodo/'+id, {headers : this.headers});
  }

}
