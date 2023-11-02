import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';


const SignInBtn = (props) => {
    const api = useAxios();
    const navigate = useNavigate();


    const handleProfileData = (object) => {
        localStorage.setItem("profileData", object.profileImage);
        handleLogin(object.name, object.email);
    }

    async function handleLogin(name, email) {
        try {
            const body = {
                name,
                email
            }
            const res = await api.post('/users/login', body);
            localStorage.setItem("userId", res?.data?.data?.id);
            navigate("/");
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.msg)
        }
    }

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    if (decoded.email_verified === false) return;
                    // props.setLoggedIn(true)
                    handleProfileData(decoded);
                    localStorage.setItem("isLogged", true)
                    console.log(decoded);
                }}
                onError={() => {
                    console.log('Login Failed');
                    alert('Google Login Failed')
                }}
            />
        </GoogleOAuthProvider>
    )
}

export default SignInBtn
