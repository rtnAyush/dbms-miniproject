
import { googleLogout } from '@react-oauth/google';
import Button from 'react-bootstrap/Button';

function LogoutBtn(props) {

    const handleGoogleLogout = () => {
      console.log('dropdown clicked')
      googleLogout();
      props.fun();
    }
  
    return (
        <Button onClick={handleGoogleLogout} variant="warning">Logout</Button>
    );
  }

  export default LogoutBtn;