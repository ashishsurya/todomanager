import { Alert } from '@material-ui/lab';
import { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ToDoForm from './components/ToDoForm';
import ToDoList from './components/ToDoList';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  // using global state
  const [{ user, open, message, severity }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    });
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
              onClose={() =>
                dispatch({ type: 'SET_ALERT', payload: { open: false } })
              }
              className='alert'
              severity={severity}
            >
              {message}
            </Alert>
          )}
          <ToDoForm />
          <ToDoList />
        </>
      )}
    </div>
  );
}

export default App;
