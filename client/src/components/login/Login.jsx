import React from 'react'
import './Login.css'

const Login = () => {

    // const signUpHandler = () => {
    //     setMode(props.mode) = false;
    // }

    return (
        <div className='login-container'>
            <div className="login-fill-box">
                <h2>Login</h2>

                <div className="actual-fill-box">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required></input>
                </div>
                <button className='btn btn-primary login-btn' type="submit">Login</button>

            </div>

            <div className="login-alt-links">
                <h5>Or Login Using</h5>
                <div className="links-cont">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-google"></i>
                </div>

            </div>

            <div className="signup-btn">
                <button type="submit" className='btn btn-primary sign-up-btn' >Sign Up</button>
            </div>

            {/* onClick={signUpHandler} */}
        </div>
    )
}

export default Login