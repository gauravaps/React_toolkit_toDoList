import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, removeTodo } from './ToDoSlice';

const AddTodos = () => {
  const toDos = useSelector((state) => state.toDos);
  const [inputText, setinputText] = useState('');
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState('');


// Load todos from localStorage on component mount
useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach((todo) => dispatch(addTodo(todo.text)));
  }, [dispatch]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(toDos));
  }, [toDos]);



  const addYourTodos = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      return alert('Please add your todo');
    }
    dispatch(addTodo(inputText));
    setinputText('');
  };

  const handleUpdateTodo = (id) => {
    if (!editText.trim()) {
      return alert('Please add your todo');
    }
    dispatch(updateTodo({ id, text: editText }));
    setEditing(null);
    setEditText('');
  };

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1 className="todo-title">Todo List Application</h1>
      </header>

      <div className="todo-form-container">
        <form className="todo-form" onSubmit={addYourTodos}>
          <input
            className="todo-input"
            type="text"
            placeholder="Add your todo..."
            value={inputText}
            onChange={(e) => setinputText(e.target.value)}
          />
          <button className="todo-add-button" type="submit">
            Add Todo
          </button>
        </form>
      </div>

      <section className="todo-list-container">
        <ul className="todo-list">
        {toDos.map((list) => (
  <li key={list.id} className="todo-item">
    {editing === list.id ? (
      <div className="todo-edit-container">
        <input
          className="todo-edit-input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button
          className="todo-save-button"
          onClick={() => handleUpdateTodo(list.id)}
        >
          Save
        </button>
      </div>
    ) : (
      <div className="todo-content">
        <span className="todo-text">{list.text}</span>
        <div className="todo-buttons">
          <button
            className="todo-edit-button"
            onClick={() => {
              setEditing(list.id);
              setEditText(list.text);
            }}
          >
            Edit
          </button>
          <button
            className="todo-remove-button"
            onClick={() => dispatch(removeTodo(list.id))}
          >
            Remove
          </button>
        </div>
      </div>
    )}
  </li>
))}

        </ul>
      </section>
    </div>
  );
};

export default AddTodos;
