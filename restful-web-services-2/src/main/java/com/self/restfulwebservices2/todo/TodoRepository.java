package com.self.restfulwebservices2.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.self.restfulwebservices2.todo.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer>{
	public List<Todo> findByUsername(String username);
	
	public List<Todo> findByDescriptionContainingIgnoreCase(String description);
}
