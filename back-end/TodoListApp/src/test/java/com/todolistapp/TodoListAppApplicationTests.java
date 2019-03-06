package com.todolistapp;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.junit4.SpringRunner;

import com.todolistapp.models.Member;
import com.todolistapp.models.TodoList;
import com.todolistapp.service.TodoListDetailService;
import com.todolistapp.service.TodoListService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TodoListAppApplicationTests {

//	@Test
//	public void contextLoads() {
//	}
	
	@Autowired
	private TodoListService todoListService;
	
	@Autowired
	private TodoListDetailService todoService;
	
	@Autowired
	private UserDetailsService userDetailService;
	
	private Member member;
	
	@Before
	public void createMember(){
		member = new Member();
		member.setId((long) 1);
		member.setFirstName("firstname_test");
		member.setLastName("lastname_test");
		member.setUsername("testuser");
		member.setEmail("testuser@gmail.com");
		member.setPassword("123");
	}

	@Test
	public void whenFindByMemberOnUserDetailsService() {
		UserDetails details = this.userDetailService.loadUserByUsername(member.getUsername());
		assertEquals(details != null ? true : false ,true);
	}
	
	@Test
	public void testGetTodoList(){
		List<TodoList> list = todoListService.getByUserId(member.getId());
		assertEquals(list.size(), 6);
	}
	
	@Test
	public void testDeleteTodoList(){
		todoListService.deleteTodoList((long)1);
		List<TodoList> list = todoListService.getByUserId(member.getId());
		assertEquals(list.size(), 5);
	}

}

