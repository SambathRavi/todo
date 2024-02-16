import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProperty, setFilterProperty] = useState('name');

  const handleNameChange = (event) => {
    setInputName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setInputDescription(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputName.trim() !== '' && inputDescription.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        name: inputName,
        description: inputDescription,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputName('');
      setInputDescription('');
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInputName(todoToEdit.name);
    setInputDescription(todoToEdit.description);
    handleDeleteTodo(id);
  };

  const filteredTodos = todos.filter((todo) =>
    filterProperty === "" ? Object.values(todo).map(data => `${data}`.toLowerCase()).includes(searchTerm.toLowerCase()) : `${todo[filterProperty]}`?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTodosByDone = filterProperty === 'completed'
    ? todos.filter((todo) => todo.completed)
    : todos.filter((todo) => !todo.completed);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Todo App</h1>
        </div>
        <div className="col d-flex gap-2 align-items-center">
          <select
            className="form-control"
            value={filterProperty}
            onChange={(e) => setFilterProperty(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="completed">Done Tasks</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo Name"
            value={inputName}
            onChange={handleNameChange}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo Description"
            value={inputDescription}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
      </div>
      <div className="row mb-3">

      </div>
      <div className="row">
        {filterProperty === 'completed' ? (
          filteredTodosByDone.map((todo) => (
            <div key={todo.id} className="col-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.name}</h5>
                  <p className="card-text">{todo.description}</p>
                  <button
                    className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-secondary'
                      } me-2`}
                    onClick={() => handleToggleTodo(todo.id)}
                  >
                    {todo.completed ? 'Completed' : 'Mark Completed'}
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditTodo(todo.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredTodos.map((todo) => (
            <div key={todo.id} className="col-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{todo.name}</h5>
                  <p className="card-text">{todo.description}</p>
                  <button
                    className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-secondary'
                      } me-2`}
                    onClick={() => handleToggleTodo(todo.id)}
                  >
                    {todo.completed ? 'Completed' : 'Mark Completed'}
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditTodo(todo.id)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoApp;
