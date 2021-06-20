import { Button, Modal } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import './Header.css';
import LoginModal from './LoginModal';
import RegiterModal from './RegiterModal';

const Header = () => {
  // *********** STATE VARIABLES **************
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);

  // using the global state
  const [{ user }, dipatch] = useStateValue();

  return (
    <header>
      <p>ToDo Manager</p>
      <Button
        title={user && 'Logout'}
        variant='contained'
        color='primary'
        className='header__btn'
        onClick={() => {
          if (!user) {
            setOpenLoginModal(true);
          } else {
            auth.signOut();
          }
        }}
      >
        {user ? <ExitToApp /> : 'Login'}
      </Button>

      {/* LOGIN MODAL */}
      <Modal
        open={openLoginModal}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      >
        <LoginModal
          setOpenLoginModal={setOpenLoginModal}
          setOpenRegisterModal={setOpenRegisterModal}
        />
      </Modal>

      <Modal
        open={openRegisterModal}
        onClose={() => {
          setOpenRegisterModal(false);
        }}
      >
        <RegiterModal
          setOpenLoginModal={setOpenLoginModal}
          setOpenRegisterModal={setOpenRegisterModal}
        />
      </Modal>
    </header>
  );
};

export default Header;
