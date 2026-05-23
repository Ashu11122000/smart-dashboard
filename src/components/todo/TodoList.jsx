// Import React hook
import { useState } from 'react';

// Import toast
import { toast } from 'react-toastify';

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
      toast.warning('Please enter a task first');
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

    // Success toast
    toast.success('Task added successfully!');

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

    toast.error('Task deleted');
  }

  // Handle filter changes
  function handleFilterChange(selectedFilter) {

    // Update filter state
    setFilter(selectedFilter);
  }

  // Filter displayed todos
  const filteredTodos = todos.filter((todo) => {

    if (filter === 'All') {
      return true;
    }

    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="space-y-5">

      <div className="flex gap-3">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter task..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <Button onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

      <TodoFilter
        currentFilter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="space-y-3">
        {filteredTodos.length === 0 && (
          <p className="text-gray-500">
            No tasks available.
          </p>
        )}

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