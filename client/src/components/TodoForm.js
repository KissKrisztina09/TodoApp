import React, {useState} from 'react'

function TodoForm(props) {
    const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = window.localStorage.getItem('token');

    const newTask = {
      title,
      dueDate,
      token,
    };

    fetch("http://localhost:5000/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "taskCreated");
        props.onSubmit(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  
    return (
      <form className='todo-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add a title'
          value={title}
          name="title"
          className='todo-input'
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type='date'
          placeholder='Due date'
          value={dueDate}
          name="dueDate"
          className='todo-input'
          onChange={e => setDueDate(e.target.value)}
        />
        <button className='todo-button'>Add</button>
      </form>
    );
}

export default TodoForm