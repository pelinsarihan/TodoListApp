import { Member } from 'src/app/models/member';
import { Component, OnInit} from '@angular/core';
import { TodoList } from 'src/app/models/todoList';
import { TodoListService } from 'src/app/services/todoList.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit{

  todoList : TodoList[];
  
  userInfo = localStorage.getItem('userInfo');
  member : Member = JSON.parse(this.userInfo).member;

  constructor(private todoListService : TodoListService) { }

  ngOnInit() {
    this.GetAllTodoList();
  }

  PostTodoList(newTodo : HTMLInputElement){
    const newTodoList : TodoList = {
      userId : this.member.id,
      header : newTodo.value,
      createdDate : new Date()
    };

    this.todoListService.PostTodoList(newTodoList).subscribe((resp : any) => {
      // console.log(resp);
      this.todoList.push(newTodoList);
    });
    newTodo.value = '';
    this.ngOnInit();
  }

  GetAllTodoList(){
    this.todoListService.GetAllTodoList(this.member.id).subscribe((resp : TodoList[]) => {
      this.todoList = resp;
      this.todoList.unshift();
      // console.log(resp);
    });
  }

  DeleteTodoList(todoId : number, todo : TodoList){
    this.todoListService.DeleteTodoList(todoId).subscribe((resp:any)=>{
      // console.log(resp);
      const index = this.todoList.indexOf(todo);
      this.todoList.splice(index,1);
    });
  }

  Logout(){
    localStorage.clear();
  }

}
