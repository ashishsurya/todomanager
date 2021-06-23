import { useEffect } from 'react';
import { db } from '../firebase';
import { useStateValue } from '../StateProvider';
import './ToDoList.css';
import ToDoListComponent from './ToDoListComponent';

const ToDoList = () => {
  // USING GLOBAL STATE
  const [{ todos }, dispatch] = useStateValue();

  useEffect(() => {
    var unsubscribe = async () => {
      await db
        .collection('todos')
        .orderBy('createdAt', 'desc')
        .onSnapshot((ss) => {
          // Respond to data
          // ...
          dispatch({
            type: 'SET_TODOS',
            payload: ss.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          });
        });
    };

    // Later ...

    // Stop listening to changes
    unsubscribe();
  }, [dispatch]);

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
