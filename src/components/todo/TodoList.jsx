// Import React hook
import { useState } from 'react';

// Import reusable Button
import Button from '../common/Button';

// Import reusable Todo item
import TodoItem from './TodoItem';

// Import filter component
import TodoFilter from './TodoFilter';

// TodoList component
export default function TodoList() {

  // State for current input value
  const [taskInput, setTaskInput] = useState('');

  // State for todo tasks array
  const [todos, setTodos] = useState([]);

  // State for active filter
  const [filter, setFilter] = useState('all');

  // Handle typing in input
  function handleInputChange(event) {

    // Update input state
    setTaskInput(event.target.value);
  }

  // Add new task
  function handleAddTask() {

    // Prevent adding empty tasks
    if (taskInput.trim() === '') {
      return;
    }

    // Create new todo object
    const newTodo = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    // Add new todo into array
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    // Clear input field
    setTaskInput('');
  }

  // Toggle completion status
  function handleToggleTask(todoId) {

    // Update todos array
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // Delete task
  function handleDeleteTask(todoId) {

    // Remove selected todo
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id !== todoId)
    );
  }

  // Handle filter changes
  function handleFilterChange(selectedFilter) {

    // Update filter state
    setFilter(selectedFilter);
  }

  // Filter displayed todos
  const filteredTodos = todos.filter((todo) => {

    // Show all todos
    if (filter === 'All') {
      return true;
    }

    // Show only active todos
    if (filter === 'Active') {
      return !todo.completed;
    }

    // Show only completed todos
    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  // Return UI
  return (

    // Main wrapper
    <div className="space-y-5">

      {/* Input + button section */}
      <div className="flex gap-3">

        {/* Task input */}
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Add task button */}
        <Button onClick={handleAddTask}>
          Add Task
        </Button>

      </div>

      {/* Filter buttons */}
      <TodoFilter
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      {/* Todo list */}
      <div className="space-y-3">

        {/* Empty state */}
        {filteredTodos.length === 0 && (
          <p className="text-gray-500">
            No tasks available.
          </p>
        )}

        {/* Render todos */}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))}

      </div>

    </div>
  );
}