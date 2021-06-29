import { Button, CircularProgress, TextField } from '@material-ui/core';
import firebase from 'firebase';
import React, { useState } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './ToDoForm.css';

const ToDoForm = () => {
  // progress bar
  const [loading, setLoading] = useState(false);

  const [todoTitle, setTodoTitle] = useState('');
  const [todo, setTodo] = useState('');

  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (todoTitle === '') {
      dispatch({
        type: 'SET_ALERT',
        payload: {
          open: true,
          message: 'Title Cannot be empty',
          severity: 'error',
        },
      });

      // deleting the alert for better user experience

      setTimeout(() => {
        dispatch({
          type: 'SET_ALERT',
          payload: {
            open: false,
            message: '',
            severity: '',
          },
        });
      }, 4000);
    } else {
      setLoading(true);
      await db.collection('todos').add({
        title: todoTitle,
        todo: todo,
        username: user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        isCompleted: false,
        isDeleted: false,
        createdAt: `${new Date().toTimeString()} ${new Date().toDateString()}`,
      });

      dispatch({
        type: 'SET_ALERT',
        payload: {
          open: true,
          message: 'Todo List has been Updated',
          severity: 'success',
        },
      });

      setTimeout(() => {
        dispatch({
          type: 'SET_ALERT',
          payload: {
            open: false,
            message: '',
            severity: '',
          },
        });
      }, 4000);

      // setting snackbar

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
        {loading ? <CircularProgress /> : 'Add todo✅✅'}
      </Button>
    </form>
  );
};

export default ToDoForm;
