import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import { auth, db } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  // using global state
  const [{ user, open, message, severity, todos }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = async () => {
      await db.collection('todos').onSnapshot((ss) => {
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

    unsubscribe();
  }, [dispatch]);

  

  return (
    <div className='app'>
      <Header />
      {!user ? (
        <Main />
      ) : (
        <>
          {open && (
            <Alert
              className={`${severity} alert`}
              onClose={() =>
                dispatch({ type: 'SET_ALERT', payload: { open: false } })
              }
              severity={severity}
            >
              {message}
            </Alert>
          )}
          <ToDoForm />
          <ToDoList todos={todos} />
        </>
      )}
    </div>
  );
}

export default App;
