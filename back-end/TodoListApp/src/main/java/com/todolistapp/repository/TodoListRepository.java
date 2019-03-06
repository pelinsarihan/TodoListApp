package com.todolistapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todolistapp.models.TodoList;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long>{
	List<TodoList> findByUserId(Long userId);
}
