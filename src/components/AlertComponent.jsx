import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const AlertComponent = ({ open, setOpen, message, severity }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
    <Alert onClose={() => setOpen(false)} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default AlertComponent;
