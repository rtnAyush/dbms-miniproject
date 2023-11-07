
import Dropdown from 'react-bootstrap/Dropdown';

import LogoutBtn from './LogoutBtn';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const clientID = "662850674072-36q49apv7ns68lui53rhj0khj1rlj4sd.apps.googleusercontent.com";



function LoginForm() {

  // const [obj, setObj] = useState(profileData)

  

  // const [isLoggedIn, setLoggedIn] = useState(false);
  
  


  // const falseMake = () => {
  //   setLoggedIn(false)
  // }


  return (
    <span className="App">

      {
        localStorage.getItem('isLogged') ?
          <>
            <Dropdown>
              <Dropdown.Toggle variant='light'  id="dropdown-basic">
                <div className="profile" ><img src={localStorage.getItem('profileData')} alt="" /></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >{<LogoutBtn  />}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>

        :

        <></>

      }
    </span>
  );
}





export default LoginForm;
