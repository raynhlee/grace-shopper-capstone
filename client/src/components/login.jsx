import React from "react";

const Login = () => {

    return(
        <div id='login-main-div'>
            <h2>Sign into your guitarget account</h2>
            <form id='login-form'>
                <div id='login-username-div'>
                    <label htmlFor="email-or-username" >Email or username</label>
                    <input required type='text' name='email-or-username' id='login-username-input'></input>
                </div>
                <div id='login-password-div'>
                    <label htmlFor="password">Password</label>
                    <input required type='password' name='password' id='login-password-input'></input>
                </div>
                <button type='submit' id='sign-in-button'>Sign in</button>
            </form>
        <button id='login-create-acc-button'> Create your guitarget account</button>
        </div>
    )
}

export default Login