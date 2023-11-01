import { useEffect } from 'react';
import { gapi } from 'gapi-script';

import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

const clientID = "662850674072-36q49apv7ns68lui53rhj0khj1rlj4sd.apps.googleusercontent.com";

function LoginForm() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID, 
        scope: ""
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  // var accessToken = gapi.auth.getToken().access_token;

  return (
    <div className="App">
      <LoginBtn />
      <LogoutBtn />
    </div>
  );
}





export default LoginForm;
