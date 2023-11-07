import { Form, Button } from 'react-bootstrap';
import "./LoginPage.css"
import SignInBtn from './SignInBtn';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setLogin } from '../../state';


const LoginPage = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const api = useAxios();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);


    async function handleAdminLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        setLoading(true);
        try {
            const body = {
                email: formData.get('email'),
                password: formData.get('password'),
            }
            const res = await api.post('/users/admin-login', body);
            dispatch(setLogin({
                user: res?.data?.data,
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

        <div className='login-page-main-cont'>
            <div className="login-cont">
                <div className="img-logo-cont">
                    <img src="/logo192.png" alt="" srcset="" />
                </div>
                <div className="heading text-center">
                    <h1>Welcome to Mess Buddy</h1>
                </div>
                <p className='text-danger text-center'>{location?.state ? "Please Login to use that Feature" : ""}</p>
                <div className="signin-cont">
                    <SignInBtn
                        location={location}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
                <h3>Admin</h3>
                <div className='login-page-cont'>
                    <Form onSubmit={handleAdminLogin}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name='password' placeholder="Password" />
                        </Form.Group>
                        <div className="btn-cont">
                            <Button size='lg' variant='primary' type='submit'>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage