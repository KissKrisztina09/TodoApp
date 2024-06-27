import React, {useState, useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const editTodo = async (id, newValue) => {
        try {
            const token = window.localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newValue),
            });
    
            if (!response.ok) {
                throw new Error('Failed to edit todo');
            }
    
            const updatedTodos = todos.map(todo =>
                todo._id === id ? { ...todo, ...newValue } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    const removeTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
            } else {
                console.error('Failed to delete todo:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const token = window.localStorage.getItem('token');
            console.log('Token:', token);
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
  
    return (
    <div>
        <h1 className='title'>Your todo list: </h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo
            todos={todos}
            removeTodo={removeTodo}
            editTodo={editTodo}
        />

    </div>
  )
}

export default TodoList