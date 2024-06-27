import React, {useState} from 'react'
import TodoForm from './TodoForm'
import { CiEdit } from "react-icons/ci";


function Todo({ todos}) {
    if (!todos || todos.length === 0) {
        return <div>No todos to display</div>;
    }


    return todos.map((todo) => (
        <div key={todo.id}>
            <div>{todo.title}</div>
          
        </div>
    ));
}

export default Todo