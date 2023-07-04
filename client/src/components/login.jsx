import React from "react";

const Login = () => {

    return(
        <div id='login-main-div'>
            <h2>Sign into your guitarget account</h2>
            <form>
                <label htmlFor="email-or-username" >Email or username</label>
                <input required type='text' name='email-or-username'></input>
                <label htmlFor="password">Password</label>
                <input required type='password' name='password'></input>
                <button type='submit'>Sign in</button>
            </form>

        </div>
    )
}

export default Login