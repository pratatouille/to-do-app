import { createRoot } from 'react-dom/client'
import React, { useState } from 'react';
import './main.css';

function TodoItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim() !== '') {
      onUpdate(task.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li>
      {isEditing ? (
        <div className="edit-group">
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="action-btn" onClick={handleSave}>Save</button>
          <button className="action-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="task-content">
          <input 
            type="checkbox" 
            checked={task.completed || false} 
            onChange={() => onToggle(task.id)} 
          />
          <span className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
          <button className="action-btn" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="action-btn delete-btn" onClick={() => onDelete(task.id)}>❌</button>
        </div>
      )}
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleUpdateTodo = (id, newText) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />
        <button className="add-btn" onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            task={todo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleComplete}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </ul>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App/>
)