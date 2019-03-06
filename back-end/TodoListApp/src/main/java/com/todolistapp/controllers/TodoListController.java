package com.todolistapp.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolistapp.models.TodoList;
import com.todolistapp.models.TodoListDetail;
import com.todolistapp.service.TodoListDetailService;
import com.todolistapp.service.TodoListService;

@RestController
@RequestMapping("/todo")
public class TodoListController {
	@Autowired
	private TodoListService todoListService;
	
	@Autowired
	private TodoListDetailService todoService;
	
	@PostMapping(value = "/addTodoList")
	public void addTodoList(@RequestBody TodoList todoList, Principal principal){
		if (isPrincipalValid(principal)){
			todoListService.saveTodoList(todoList);
		}
	}
	
	@GetMapping(value = "/getTodoList/{userId}")
	public ResponseEntity<List<TodoList>> getTodoList(@PathVariable("userId") Long userId, Principal principal){
		if (isPrincipalValid(principal)){
			List<TodoList> list = todoListService.getByUserId(userId);
			return new ResponseEntity<List<TodoList>>(list, HttpStatus.OK);
		}
		return null;
	}
	
	@DeleteMapping(value="/deleteTodoList/{todoId}")
	public void deleteTodoList(@PathVariable("todoId") Long todoId, Principal principal){
		if (isPrincipalValid(principal)){
			todoService.deleteTodosByTodoListId(todoId);
			todoListService.deleteTodoList(todoId);
		}
	}
	
	@PostMapping(value="/addTodo")
	public void addTodo(@RequestBody TodoListDetail todo, Principal principal){
		if (isPrincipalValid(principal)){
			todoService.addTodo(todo);
		}
	}
	
	@GetMapping(value="/getTodo/{todoId}")
	public List<TodoListDetail> getAllTodo(@PathVariable("todoId") Long todoId, Principal principal){
		if (isPrincipalValid(principal)){
			return todoService.getAllTodo(todoId);
		}
		return null;
	}
	
	@PutMapping(value="updateTodo")
	public void updateTodo(@RequestBody TodoListDetail todo, Principal principal){
		if (isPrincipalValid(principal)){
			todoService.updateTodo(todo);
		}
	}
	
	@DeleteMapping(value="/deleteTodo/{id}")
	public void deleteTodo(@PathVariable("id") Long id, Principal principal){
		if (isPrincipalValid(principal)){
			todoService.deleteTodo(id);
		}
	}
	
	public boolean isPrincipalValid(Principal principal){
		if(principal != null) return true;
		else return false;
	}
	
}
