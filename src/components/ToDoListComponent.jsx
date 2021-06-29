import { IconButton, Paper } from '@material-ui/core';
import { DeleteForever, Done } from '@material-ui/icons';
import PropType from 'prop-types';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './ToDoListComponent.css';

const ToDoListComponent = ({
  createdAt,
  isCompleted,
  title,
  todo,
  username,
  id,
  isDeleted,
}) => {
  // state variables

  const [completed, setCompleted] = useState(isCompleted);

  const [modalOpen, setOpenModal] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = async () => {
      await db.collection('todos').doc(id).update({
        isCompleted: completed,
      });
    };

    unsubscribe();
  }, [completed, id]);

  const handleDelete = async () => {
    await db.collection('todos').doc(id).delete();

    dispatch({
      type: 'SET_ALERT',
      payload: {
        open: true,
        message: 'succesfully deleted',
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
  };

  const handleTodoCLick = () => {
    if (isCompleted) {
      return;
    } else {
      setOpenModal(true);
      console.log('Todo CLicked');
    }
  };

  if (username === user.email) {
    return (
      <Paper className='outerpaper' elevation={6}>
        <div className='todolistcomponent'>
          {/* title */}
          <p
            onClick={handleTodoCLick}
            className={
              !completed
                ? 'todolistcomponent__title'
                : 'todolistcomponent__title text_strike'
            }
          >
            {title}
            {/* <small>{createdAt.toDate().toString()}</small> */}
          </p>

          {/* completed button */}
          <div className='todolistcomponent__buttons'>
            <IconButton
              title='Done'
              onClick={() => setCompleted(!completed)}
              className='todolistcomponent__icon'
              color='primary'
            >
              <Done />
            </IconButton>
            {/* delete button */}
            <IconButton
              title='Delete'
              color='secondary'
              className='todolistcomponent__icon'
              onClick={handleDelete}
            >
              <DeleteForever />
            </IconButton>
          </div>
        </div>
      </Paper>
    );
  } else {
    return null;
  }
};

ToDoListComponent.prototype = {
  createdAt: PropType.any,
  isCompleted: PropType.bool,
  title: PropType.string,
  todo: PropType.string,
  username: PropType.string,
  id: PropType.string,
  isDeleted: PropType.bool,
};

export default ToDoListComponent;
