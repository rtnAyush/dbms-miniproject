import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../state';
import { googleLogout } from '@react-oauth/google';
import { Spinner } from 'react-bootstrap';


export default function SignInBtn({ location, loading, setLoading, type }) {
    const api = useAxios();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function handleLogin(googleObj) {
        // console.log(googleObj);
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
            navigate(location?.state?.redirect || '/');
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.msg)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <GoogleLogin
                    size='large'
                    shape='pill'
                    width={300}
                    theme='filled_blue'
                    type={type}
                    onSuccess={credentialResponse => {
                        setLoading(true);
                        const decoded = jwtDecode(credentialResponse.credential);
                        if (decoded.email_verified === false) {
                            setLoading(false);
                            return;
                        }
                        if (decoded.email.split('@')[1] !== 'iiitt.ac.in') {
                            alert('This is not vaild IIIT TRichy account!!!!');
                            setLoading(false);
                            googleLogout();
                            return;
                        }
                        handleLogin(decoded);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        setLoading(false);
                        alert('Google Login Failed')
                    }}
                />
            </GoogleOAuthProvider>
            {loading &&
                <div className='my-4 text-center'>
                    <Spinner />
                    <p>Please wait while Authenticating... </p>
                </div>
            }
        </>
    )
}

