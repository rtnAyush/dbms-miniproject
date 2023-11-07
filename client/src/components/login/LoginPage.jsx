import { Form, Button } from 'react-bootstrap';
import "./LoginPage.css"
import SignInBtn from './SignInBtn';
const LoginPage = () => {

    // const profileData = {
    //     profileName: "",
    //     profileImage: "https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw",
    //     profileId: "",
    //     profileEmail: ""
    // }



    return (

        <div className='login-page-main-cont'>
            <div className="login-cont">
                <div className="img-logo-cont">
                    <img src="/logo192.png" alt="" srcset="" />
                </div>
                <div className="heading text-center">
                    <h1>Welcome to Mess Buddy</h1>
                </div>
                <div className="signin-cont">
                    <SignInBtn />
                </div>
                <h3>Admin</h3>
                <div className='login-page-cont'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <div className="btn-cont">
                            <Button size='lg' variant='primary'>Submit</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage