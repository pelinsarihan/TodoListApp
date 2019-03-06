package com.todolistapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todolistapp.models.TodoListDetail;

@Repository
public interface TodoListDetailRepository extends JpaRepository<TodoListDetail, Long>{
	List<TodoListDetail> findByTodoId(Long todoId);
}
