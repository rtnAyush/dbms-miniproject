import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';
import { setLogout } from '../../state';
import { useDispatch } from 'react-redux';


function LogoutBtn() {
  const dispatch = useDispatch();


  const handleGoogleLogout = () => {
    googleLogout();
    dispatch(setLogout());
  }

  return (
    <Button onClick={handleGoogleLogout} variant="warning">Logout</Button>
  );
}

export default LogoutBtn;