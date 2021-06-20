import { Button, CircularProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import AlertComponent from './AlertComponent';
import './ToDoForm.css';

const ToDoForm = () => {
  // progress bar
  const [loading, setLoading] = useState(false);

  // AlertCOmponent Props

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [todoTitle, setTodoTitle] = useState('');
  const [todo, setTodo] = useState('');

  const [{ user }] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoTitle === '') {
      setOpen(true);
      setMessage('Title cannot be empty');
      setSeverity('warning');
    } else {
      setLoading(true);
      await db.collection('todos').add({
        title: todoTitle,
        todo: todo,
        username: user.email,
        createdAt: `${new Date().toDateString()} ${new Date().toTimeString()}`,
        isCompleted: false,
      });

      // setting snackbar
      setOpen(true);
      setMessage('Succesfully Added');
      setSeverity('success');

      // clearing state variables
      setLoading(false);
      setTodo('');
      setTodoTitle('');
    }
  };

  return (
    <form className='todoform' onSubmit={handleSubmit}>
      <TextField
        label='Title'
        className='todoinput'
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <TextField
        label='Description of the todo'
        multiline
        variant='outlined'
        className='todoinput'
        rows={6}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button type='submit' className='todobtn'>
        {loading ? <CircularProgress /> : 'Add todo🚀🚀'}
      </Button>

      <AlertComponent
        message={message}
        open={open}
        setOpen={setOpen}
        severity={severity}
      />
    </form>
  );
};

export default ToDoForm;
