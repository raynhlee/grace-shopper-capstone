import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchFromAPI } from "../api";

const Register = ({username, setUsername, setToken, setUser}) => {
    const history = useHistory();
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [passwordToCheck, setPasswordToCheck] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    
    const handleSubmit = async(event) => {
        
        event.preventDefault();

        if(passwordToCheck === confirmPassword){
            setPassword(confirmPassword);
        } else {
            alert('Passwords do not match')
        }
        
        const requestBody = {
            username,
            password,
            email
        }

        const data = await fetchFromAPI({
            path: '/users/register',
            method: "POST",
            body: requestBody
        })

        console.log('data', data);

        const {token} = data;

        if(!token) {
            alert('Invalid username or password')
        }

        if (token) {
            const data = await fetchFromAPI({
                path: '/users/me',
                token
            });
            const user = data;

            setUsername('');
            setPasswordToCheck('');
            setConfirmPassword('');
            setEmail('');
            setToken(token);
            setUser(user);
            console.log('thank you for signing up')
            history.push('/')
        }
    }


    return(
        <div id='register-main-div'>
            <h2>Create a guitarget account</h2>
            <form id='register-form' onSubmit={handleSubmit}>
                <div id='register-username-div'>
                    <label htmlFor="username" >Username</label>
                    <input required type='text' name='username'  id='login-password-input' value={username} onChange={(event) => {
                        setUsername(event.target.value)
                    }}></input>
                </div>
                <div id='register-email-div'>
                    <label htmlFor="email" >Email</label>
                    <input required type='text' name='username'  id='login-password-input' value={email} onChange={(event) => {
                        setEmail(event.target.value)
                    }}></input>
                </div>
                <div id='register-password-div'>
                    <label htmlFor="password">Password</label>
                    <input required type='password' name='password' id='login-password-input' value={passwordToCheck} onChange={(event) => {
                        setPasswordToCheck(event.target.value);
                    
                    }}></input>
                </div>
                <div id='confirm-password-div'>
                    <label htmlFor="password">Confirm password</label>
                    <input required type='password' name='password' id='login-password-input' value={confirmPassword} onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        setPassword(event.target.value);
                    }}></input>
                </div>
                <button type='submit' id='sign-in-button'>Create account</button>
            </form>
       <Link to='/users/login' id='or-sign-in-link'><p> Or sign in</p></Link> 
        </div>
    )
}
export default Register;