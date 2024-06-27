import React, { useState, useEffect } from 'react';

function TodoForm({ edit, onSubmit }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (edit) {
      setTitle(edit.title);
      setDueDate(edit.dueDate);
    }
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem('token');

    const taskData = {
      title,
      dueDate,
      token,
    };

    try {
      let responseData;
      if (edit) {
        const response = await fetch(`http://localhost:5000/tasks/${edit._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(taskData),
        });
        responseData = await response.json();
      } else {
        const response = await fetch('http://localhost:5000/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(taskData),
        });
        responseData = await response.json();
      }

      onSubmit(responseData);

      setTitle('');
      setDueDate('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add a task'
        value={title}
        name='title'
        className='todo-input'
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='datetime-local'
        placeholder='Due date'
        value={dueDate}
        name='dueDate'
        className='todo-input'
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button className='todo-button'>{edit ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default TodoForm;
