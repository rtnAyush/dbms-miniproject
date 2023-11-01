import { GoogleLogin } from 'react-google-login';

const clientID = "662850674072-36q49apv7ns68lui53rhj0khj1rlj4sd.apps.googleusercontent.com";

function LoginBtn(props) {
    const onSuccess = (res) => {
      console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
      props.fun();
      const obj = {}
      obj.profileName = res.profileObj.name;
      obj.profileImage = res.profileObj.imageUrl;
      obj.profileId = res.profileObj.googleId;
      obj.profileEmail = res.profileObj.email;
        console.log(obj)
      props.stfun(obj)
    };
  
    const onFailure = (res) => {
      console.log("LOGIN FAILED! res: ", res);
    };
  
    return (
      <div id="signInButton">
        <GoogleLogin
          clientId={clientID}
          buttonText='Login'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'} 
          isSignedIn={true}
        />
      </div>
    );
  }

  export default LoginBtn;