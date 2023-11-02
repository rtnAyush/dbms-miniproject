import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import { googleLogout } from '@react-oauth/google';


const SignInBtn = () => {
    const api = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleLogin(googleObj) {
        console.log(googleObj);
        try {
            const body = {
                name: googleObj.name,
                email: googleObj.email,
            }
            const res = await api.post('/users/login', body);
            dispatch(setLogin({
                user: {
                    userId: res?.data?.data?.id,
                    name: googleObj.name,
                    email: googleObj.email,
                    profileImage: googleObj?.picture,
                    ...res?.data?.data
                },
                isLogged: true,
            }))
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
                    if (decoded.email.split('@')[1] !== 'iiitt.ac.in') {
                        alert('This is not vaild IIIT TRichy account!!!!');
                        googleLogout();
                        return;
                    }
                    handleLogin(decoded);
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
