import React, {useState} from "react";
import { fetchFromAPI } from "../api";
import { Link, useHistory } from "react-router-dom";

const Login = ({username, setUsername, setToken, setUser}) => {
    const [password, setPassword] = useState('')
    // Why is useHistory not working?? getting weird error "invalid hook call, hooks can only be called inside the body of a function component"
    

    const handleSubmit = async(event) => {
        
        event.preventDefault();
        
        const requestBody = {
            username,
            password
        }

        const data = await fetchFromAPI({
            path: '/users/login',
            method: "POST",
            body: requestBody
        })

        console.log('data', data);

        const {token} = data;

        if(!token) {
            alert('Invalid username or password')
        }

        const user = data;

        if (token) {
            setUsername('');
            setPassword('');
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            console.log('thank you for logging in')
            //history.push('/')
        }

        
    }

    return(
        <div id='login-main-div'>
            <h2>Sign into your guitarget account</h2>
            <form id='login-form' onSubmit={handleSubmit}>
                <div id='login-username-div'>
                    <label htmlFor="email-or-username" >Email or username</label>
                    <input required type='text' name='email-or-username' id='login-username-input' value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }}></input>
                </div>
                <div id='login-password-div'>
                    <label htmlFor="password">Password</label>
                    <input required type='password' name='password' id='login-password-input' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }}></input>
                </div>
                <button type='submit' id='sign-in-button'>Sign in</button>
            </form>
        <button id='login-create-acc-button'> Create your guitarget account</button>
        </div>
    )
}

export default Login