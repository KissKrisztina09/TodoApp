import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineDoneOutline } from "react-icons/md";
import { MdHourglassEmpty } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { VscDebugStart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";

const Todo = ({ todos, removeTodo, editTodo }) => {
    const [tasks, setTasks] = useState(todos);
    const [editId, setEditId] = useState(null);
    const [editValues, setEditValues] = useState({
        title: '',
        status: '',
        dueDate: ''
    });

    useEffect(() => {
        setTasks(todos);
    }, [todos]);

    const editTodoHandler = (todo) => {
        setEditId(todo._id);
        setEditValues({
            title: todo.title,
            status: todo.status,
            dueDate: todo.dueDate
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const changeStatusToInProgress = (id) => {
        editTodo(id, {status: 'in progress' });
    };

    const changeStatusToDone = (id) => {
        editTodo(id, {status: 'done' });
    };

    const handleUpdate = (id) => {
        editTodo(id, editValues);
        setEditId(null);
    };

    const getStatusButton = (status, id) => {
        switch (status) {
            case 'todo':
                return (
                    <button className="status-button" onClick={() => changeStatusToInProgress(id)}>
                        <VscDebugStart className='btn-icon'/>
                    </button>
                );
            case 'in progress':
                return (
                    <button className="status-button" onClick={() => changeStatusToDone(id)}>
                        <CiPause1 className='btn-icon'/>
                    </button>
                );
            case 'done':
                return null;
            default:
                return null;
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'todo':
                return <LuListTodo className='icon-todo' />;
            case 'in progress':
                return <MdHourglassEmpty className='icon-inprogress' />;
            case 'done':
                return <MdOutlineDoneOutline className='icon-done' />;
            default:
                return null;
        }
    };

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString();
    };

    return (
        <div>
            <table className='todo-table'>
                <thead>
                    <tr>
                        <th></th>
                        <th className="title-column">Title</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((todo) => (
                        <tr key={todo._id}>
                            <td>{getStatusIcon(todo.status)}</td>
                            <td className="title-column">
                                {editId === todo._id ? (
                                    <input
                                        type='text'
                                        name='title'
                                        value={editValues.title}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    todo.title
                                )}
                            </td>
                            <td>
                                {editId === todo._id ? (
                                    <input
                                        type='text'
                                        name='status'
                                        value={editValues.status}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                ) : (
                                    <>
                                        {todo.status}
                                        {getStatusButton(todo.status, todo._id)}                                    </>
                                )}
                                
                            </td>
                            <td>{formatDateTime(todo.dueDate)}</td>
                            <td className='icons'>
                                {editId === todo._id ? (
                                    <button onClick={() => handleUpdate(todo._id)}>Save</button>
                                ) : (
                                    <>
                                        <MdDeleteOutline className='icon' onClick={() => removeTodo(todo._id)} />
                                        <CiEdit className='icon-edit' onClick={() => editTodoHandler(todo)} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Todo;