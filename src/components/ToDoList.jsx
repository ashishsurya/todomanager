import { TrafficRounded } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './ToDoList.css';
import ToDoListComponent from './ToDoListComponent';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);

  const [completedTodos, setCompletedTodos] = useState([]);

  const [inCompleteTodos, setInCompleteTodos] = useState([]);

  // USING GLOBAL STATE
  const [{ user }] = useStateValue();

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = db
        .collection('todos')
        .where('username', '==', `${user.email}`);

      await ref.onSnapshot((ss) => {
        setTodos(
          ss.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    unsubscribe();
  }, [todos, user.email]);

  console.log(todos);

  return (
    <div className='todolist'>
      {todos?.map((todo) => (
        <ToDoListComponent key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDoList;
