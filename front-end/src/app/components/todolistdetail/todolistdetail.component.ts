import { TodoListService } from './../../services/todoList.service';
import { Component, OnInit } from '@angular/core';
import { TodoListDetail } from 'src/app/models/todoListDetail';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todolistdetail',
  templateUrl: './todolistdetail.component.html',
  styleUrls: ['./todolistdetail.component.css']
})
export class TodolistdetailComponent implements OnInit {

  todoListDetail : TodoListDetail[];

  todos : TodoListDetail[];

  filterList : any[] = [{status : 1, name : 'Completed'},{status : 0, name : 'Uncompleted'}];
  
  todo_id : any;
  todo_name : any;

  constructor(private service : TodoListService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.todo_id = params.id;
      this.todo_name = params.todoListName;
    });
    this.GetAllTodo(this.todo_id);
  }

  toggleVisibility(e : any, todo : TodoListDetail){
    if(e.target.checked == true){
      todo.marked = true;
      todo.status = 1;
    }else{
      todo.marked = false;
      todo.status = 0;
    }
    this.service.UpdateTodo(todo).subscribe();
  }

  GetAllTodo(todo_id: number){
    this.service.GetAllTodo(todo_id).subscribe((resp : TodoListDetail[]) => {
      this.todoListDetail = resp;
      for(let todo of this.todoListDetail){
        if(todo.status == 1){
          todo.marked = true;
        }if(todo.status == 0){
          todo.marked = false;
        }
      }
      this.todos = this.todoListDetail;
    });
  }

  PostTodo(newTodoName : HTMLInputElement, deadline1 : HTMLInputElement){
    const newTodo : TodoListDetail = {
    "todoId" : this.todo_id,
    "todoName" : newTodoName.value,
    "createdDate" : new Date(),
    "deadline" : deadline1.value,
    "status" : 0
    };

    this.service.PostTodo(newTodo).subscribe((resp : any) => {
      this.todoListDetail.push(newTodo);
      // console.log(resp);
    });

    newTodoName.value = '';
    deadline1.value = '';
  }

  DeleteTodo(todo : TodoListDetail){
    this.service.DeleteTodo(todo.id).subscribe((resp : any) => {
      const index = this.todoListDetail.indexOf(todo);
      this.todoListDetail.splice(index,1);
    });
  }

  SortTodoASCByDeadline(){
    this.todoListDetail.sort((a, b) => {
      if (a.deadline < b.deadline) return -1;
      else if (a.deadline > b.deadline) return 1;
      else return 0;
    });
  }
  SortTodoDSCByDeadline(){
    this.todoListDetail.sort((a, b) => {
      if (a.deadline < b.deadline) return 1;
      else if (a.deadline > b.deadline) return -1;
      else return 0;
    });
  }

  SortTodoASCByCreatedDate(){
    this.todoListDetail.sort((a, b) => {
      if (a.createdDate < b.createdDate) return -1;
      else if (a.createdDate > b.createdDate) return 1;
      else return 0;
    });
  }
  SortTodoDSCByCreatedDate(){
    this.todoListDetail.sort((a, b) => {
      if (a.createdDate < b.createdDate) return 1;
      else if (a.createdDate > b.createdDate) return -1;
      else return 0;
    });
  }

  SortTodoASCByTodoName(){
    this.todoListDetail.sort((a, b) => {
      if (a.todoName < b.todoName) return -1;
      else if (a.todoName > b.todoName) return 1;
      else return 0;
    });
  }
  SortTodoDSCByTodoName(){
    this.todoListDetail.sort((a, b) => {
      if (a.todoName < b.todoName) return 1;
      else if (a.todoName > b.todoName) return -1;
      else return 0;
    });
  }

  SortTodoASCByStatus(){
    this.todoListDetail.sort((a, b) => {
      if (a.status < b.status) return -1;
      else if (a.todoName > b.todoName) return 1;
      else return 0;
    });
  }
  SortTodoDSCByStatus(){
    this.todoListDetail.sort((a, b) => {
      if (a.status < b.status) return 1;
      else if (a.status > b.status) return -1;
      else return 0;
    });
  }

  FilterByStatus(status : any){
    this.todoListDetail = this.todos.filter((resp : TodoListDetail) => {
      return resp.status.toString().match(status.toString());
    });
  }

  Clear(){
    location.reload();
  }

  Logout(){
    localStorage.clear();
  }

}
