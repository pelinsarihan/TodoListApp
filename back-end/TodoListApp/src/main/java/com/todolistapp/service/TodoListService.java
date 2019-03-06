package com.todolistapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolistapp.models.TodoList;
import com.todolistapp.repository.TodoListRepository;

@Service
public class TodoListService {
	@Autowired
	private TodoListRepository todoListRepo;
	
	public void saveTodoList(TodoList todoList){
		todoListRepo.save(todoList);
	}
	
	public List<TodoList> getByUserId(Long userId){
		return todoListRepo.findByUserId(userId);
	}
	
	public void deleteTodoList(Long todoListId){
		todoListRepo.deleteById(todoListId);
	}
}
