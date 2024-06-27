import React, {useState} from 'react';
import { Component } from 'react';
import { useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const token = window.localStorage.getItem('token');
            console.log('Token:', token); // Log the token here
            const response = await fetch('http://localhost:5000/tasks', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setTodos([]);
        }
    };
    
    const addTodo = todo =>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos = [todo, ...todos]
        
        setTodos(newTodos)
        console.log(todo, ...todos);

    }
  
    const completeTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ isComplete: true }),
            });
            if (response.ok) {
                const updatedTodos = todos.map((todo) =>
                    todo.id === id ? { ...todo, isComplete: true } : todo
                );
                setTodos(updatedTodos);
            } else {
                console.error('Failed to complete todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    };

    return (
    <div>
        <h1>Here is your todo list: </h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo
            todos={todos}
        />
    </div>
  )
}

export default TodoList