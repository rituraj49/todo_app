package com.self.restfulwebservices2.todo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	
	private static int count = 0;
	private static List<Todo> list = new ArrayList<>();
	
	static {
		list.add(new Todo(++count, "Terran", "Learn to fly", LocalDate.now().plusYears(1), false));
		list.add(new Todo(++count, "Terran", "Learn to pilot ftl spaceships", LocalDate.now().plusYears(3), false));
		list.add(new Todo(++count, "Terran", "Learn to drive battleship cruisers", LocalDate.now().plusYears(2), false));
	}
	
	public List<Todo> findByUsername(){
		return list;
	}
	
	public Todo addTodo(String username, String description, LocalDate targetDate, boolean done) {
		Todo todo = new Todo(++count, username, description, targetDate, done);
		list.add(todo);
		return todo;
	}
	
	public Todo findById(int id) {
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		return list.stream().filter(predicate).findFirst().get();
	}
	
	public void deleteById(int id) {
		Predicate<? super Todo> predicate = todo -> todo.getId() == id;
		list.removeIf(predicate);
	}
	
	public void updateById(Todo todo) {
		deleteById(todo.getId());
		list.add(todo);
	}

}
