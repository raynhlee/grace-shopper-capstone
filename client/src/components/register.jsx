import React, {useState} from "react";

const Register = ({username, setUsername, setToken, setUser}) => {
    const [password, setPassword] = useState('')

    return(
        <div id='register-main-div'>
            <h2>Sign into your guitarget account</h2>
            <form id='register-form'>
                <div id='register-username-div'>
                    <label htmlFor="email-or-username" >Email or username</label>
                    <input required type='text' name='email-or-username' id='login-username-input' value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }}></input>
                </div>
                <div id='register-password-div'>
                    <label htmlFor="password">Password</label>
                    <input required type='password' name='password' id='login-password-input' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}></input>
                </div>
                <div id='confirm-password-div'>
                    <label htmlFor="password">Confirm password</label>
                    <input required type='password' name='password' id='login-password-input' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}></input>
                </div>
                <button type='submit' id='sign-in-button'>Create account</button>
            </form>
        <p> Or sign in</p>
        </div>
    )
}
export default Register;