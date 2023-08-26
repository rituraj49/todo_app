package com.self.restfulwebservices2.todo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	@Autowired
	TodoRepository todoRepository;

	@GetMapping("/users/{username}/todos")
	public ResponseEntity<List<Todo>> retrieveTodos(@PathVariable String username, @RequestParam(required = false) String description) {
//		return todoService.findByUsername();
		List<Todo> todos = new ArrayList<>();
		
		if(description == null) {
			todoRepository.findByUsername(username).forEach(todos::add);
		} else {
			todoRepository.findByDescriptionContainingIgnoreCase(description).forEach(todos::add);
		}
		if(todos.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(todos, HttpStatus.OK);
	}
	
//	@GetMapping("/users/{username}/todos")
//	public List<Todo> retrieveTodos(@PathVariable String username) {
////		return todoService.findByUsername();
//			return todoRepository.findByUsername(username);
//	}
	
	@GetMapping("users/{username}/todos/{id}")
	public Todo retrieveSingleTodo(@PathVariable String username, @PathVariable int id) {
//		return todoService.findById(id);
		return todoRepository.findById(id).get();
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int id) {
//		todoService.deleteById(id);
		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/users/{username}/todos")
	public Todo addTodo(@PathVariable String username, @RequestBody Todo todo) {
		todo.setUsername(username);
		todo.setId(null);
//		Todo newTodo = todoService.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
		Todo newTodo = todoRepository.save(todo);
		return newTodo;
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username,@PathVariable int id, @RequestBody Todo todo) {
//		 todoService.updateById(todo);
		todoRepository.save(todo);
		return todo;
	}

}
