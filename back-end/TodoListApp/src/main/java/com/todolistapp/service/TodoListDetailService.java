package com.todolistapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolistapp.models.TodoListDetail;
import com.todolistapp.repository.TodoListDetailRepository;

@Service
public class TodoListDetailService {
	
	@Autowired
	private TodoListDetailRepository todoRepository;
	
	public void addTodo(TodoListDetail todo){
		todoRepository.save(todo);
	}
	
	public List<TodoListDetail> getAllTodo(Long todoId){
		return todoRepository.findByTodoId(todoId);
	}
	
	public void updateTodo(TodoListDetail todo){
		List<TodoListDetail> list = todoRepository.findAll();
		TodoListDetail updatedTodo = null;
		for (TodoListDetail todo1 : list) {
			if (todo1.getId() == todo.getId()) {
				updatedTodo = todo1;
				updatedTodo.setStatus(todo.getStatus());
				todoRepository.save(updatedTodo);
			}
		}
	}
	
	public void deleteTodo(Long id){
		todoRepository.deleteById(id);
	}
	
	public void deleteTodosByTodoListId(Long id){
		List<TodoListDetail> list = todoRepository.findByTodoId(id);
		todoRepository.deleteAll(list);
	}
	
}
