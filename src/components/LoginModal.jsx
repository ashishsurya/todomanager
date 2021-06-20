import { Button } from '@material-ui/core';
import { AccountCircleOutlined, VpnKey } from '@material-ui/icons';
import React from 'react';
import { auth } from '../firebase';


const LoginModal = ({setOpenLoginModal, setOpenRegisterModal}) => {

  // login inputs
  const [logEmail, setLogEmail] = React.useState('');
  const [logPassword, setLogPassword] = React.useState('');

  // ********* LOGIN HANDLER *************888
  const handleLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(logEmail, logPassword)
      .then((user) => {
        console.log(user);
        setOpenLoginModal(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='modal'>
      {/* Login Form */}
      <form className='loginform' onSubmit={handleLogin}>
        <div className='loginform__username input'>
          <AccountCircleOutlined className='icon' />
          <input
            type='text'
            placeholder='Email'
            value={logEmail}
            onChange={(e) => {
              setLogEmail(e.target.value);
            }}
          />
        </div>
        <div className='loginform__password input'>
          <VpnKey className='icon' />
          <input
            type='password'
            placeholder='Password'
            value={logPassword}
            onChange={(e) => {
              setLogPassword(e.target.value);
            }}
          />
        </div>

        <Button
          type='submit'
          className='loginform__loginbtn'
          variant='contained'
        >
          Login
        </Button>
      </form>
      <Button
        onClick={() => {
          setOpenLoginModal(false);
          setOpenRegisterModal(true);
        }}
        variant='contained'
      >
        No Account Register Here
      </Button>
    </div>
  );
};

export default LoginModal;
