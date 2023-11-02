
import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';

function LogoutBtn(props) {
  const handleGoogleLogout = () => {
    console.log('dropdown clicked')
    googleLogout();
    localStorage.setItem('isLogged', false);
    localStorage.removeItem('profileData');

  }

  return (
    <Button onClick={handleGoogleLogout} variant="warning">Logout</Button>
  );
}

export default LogoutBtn;