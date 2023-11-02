// import {GoogleLogout } from 'react-google-login';

const clientID = "662850674072-36q49apv7ns68lui53rhj0khj1rlj4sd.apps.googleusercontent.com";

function LogoutBtn(props) {
    // const onSuccess = () => {
    //   console.log("Log out successful!");
    //   props.fun();
    // };
  
    return (
      <div id='signOutButton'>
        {/* <GoogleLogout
          clientId={clientID}
          buttonText={'Logout'}
          onLogoutSuccess={onSuccess}
        /> */}
      </div>
    );
  }

  export default LogoutBtn;