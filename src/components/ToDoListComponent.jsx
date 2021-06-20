import { IconButton, Paper } from '@material-ui/core';
import { DeleteForever, Done } from '@material-ui/icons';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
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

  useEffect(() => {
    const unsubscribe = async () => {
      await db.collection('todos').doc(id).update({
        isCompleted: completed,
      });
    };

    unsubscribe();
  }, [completed, id]);

  return (
    <Paper className='outerpaper' elevation={6}>
      <div className='todolistcomponent'>
        {/* title */}
        <p
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
            onClick={() => {}}
            title='Delete'
            color='secondary'
            className='todolistcomponent__icon'
          >
            <DeleteForever />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
};

export default ToDoListComponent;
