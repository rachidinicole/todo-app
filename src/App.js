import React, { useState } from 'react';

import './App.css'

function TodoList() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('low');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        priority: priority
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleUpdateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App-header'>
      {!loggedIn ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
          <h2>Todo List</h2>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new todo"
          />
          <select value={priority} onChange={handlePriorityChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleAddTodo}>Add</button>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search todo"
          />
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id} style={{ color: todo.priority }}>
                {todo.text}
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                <button onClick={() => handleUpdateTodo(todo.id, 'Updated Text')}>
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoList;

