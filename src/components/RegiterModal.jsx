import { Button } from '@material-ui/core';
import { AccountCircleOutlined, VpnKey } from '@material-ui/icons';
import React from 'react';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';


const RegiterModal = ({ setOpenLoginModal, setOpenRegisterModal }) => {
  // register inputs
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');


  // using the global state
  const [state, dipsatch] = useStateValue()
  

  const handleSignUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(regEmail, regPassword)
      .then(({user}) => {
        dipsatch({type:"SET_USER", payload:user})
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form className='registerform' onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <div className='registerform__username input'>
        <AccountCircleOutlined className='icon' />
        <input
          type='text'
          placeholder='Email'
          value={regEmail}
          onChange={(e) => {
            setRegEmail(e.target.value);
          }}
        />
      </div>
      <div className='registerform__password input'>
        <VpnKey className='icon' />
        <input
          type='password'
          placeholder='Password'
          value={regPassword}
          onChange={(e) => {
            setRegPassword(e.target.value);
          }}
        />
      </div>

      <Button
        type='submit'
        className='registerform__loginbtn'
        variant='contained'
      >
        Register
      </Button>
    </form>
  );
};

export default RegiterModal;
