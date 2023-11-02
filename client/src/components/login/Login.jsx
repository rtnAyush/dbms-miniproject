
import Dropdown from 'react-bootstrap/Dropdown';

import LogoutBtn from './LogoutBtn';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useState } from 'react';

const clientID = "662850674072-36q49apv7ns68lui53rhj0khj1rlj4sd.apps.googleusercontent.com";

const profileData = {
  profileName: "",
  profileImage: "https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw",
  profileId: "",
  profileEmail: ""
}

function LoginForm() {

  const [obj, setObj] = useState(profileData)

  const handleProfileData = (object) => {
    console.log('hiiiii')
    console.log(object)
    console.log(object.name)
    const temp = {}
    temp.profileName = object.name;
    temp.profileImage = object.picture;
    temp.profileId = object.aud;
    temp.profileEmail = object.email;
    setObj(temp)
  }

  const [isLoggedIn, setLoggedIn] = useState(true);


  const falseMake = () => {
    setLoggedIn(false)
  }


  return (
    <span className="App">

      {
        isLoggedIn ?
          <>
            <Dropdown>
              <Dropdown.Toggle variant='light'  id="dropdown-basic">
                <div className="profile" ><img src={obj.profileImage} alt="" /></div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >{<LogoutBtn fun={falseMake} />}</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
          :
          <GoogleOAuthProvider clientId={clientID}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                if (decoded.email_verified === false) return;
                setLoggedIn(true)
                handleProfileData(decoded);
                console.log(decoded);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>

      }
    </span>
  );
}





export default LoginForm;
