import React from 'react'
import './Login.css';



const Login = () => {

    return (
        <div className="login-signup-page">
            <div className="login-header">
                <div>Login</div>
                <div>SignUp</div>
            </div>
            <div className="login-signup-form-container">
                <div className="login-form-container">
                    <form action="#" method="POST" className="login-form">
                        <input type="email" placeholder="Email"></input>
                        <input type="password" placeholder="Password"></input>
                    </form>
                </div>
                <div className="signup-form-container">
                    <form action="#" method="POST" className="signup-form">
                        <input type="text" placeholder="User Name"></input>
                        <input type="email" placeholder="Email"></input>
                        <input type="password" placeholder="Password"></input>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
