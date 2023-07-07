import React, {useState} from 'react';
import { Link, useHistory} from "react-router-dom";

const Header = ({token, setToken, setUser}) => {

    return (
        <div id='header-main-div'>
            <div id='header-main-section'>
                <Link to='/'><h1 id='site-main-header'>guitarget</h1></Link>
                <div id='nav-bar'>
                    <div className="dropdown">
                        <button id='categories' className="dropbtn">Categories</button>
                        <div className="dropdown-content">
                            <Link to='/guitars'>Guitars</Link>
                            
                        </div>
                    </div>
                    <form id='search-bar-div'>
                        <input id='search-bar' type="text" placeholder='What can we help you find?'></input>
                    </form>
                    <div id='header-account-buttons-div'>
                        {token
                        ? <button id='logout-button' onClick={(event) => {
                            event.preventDefault();
                            setToken('');
                            setUser('');
                            localStorage.removeItem("token");
                        }}>Logout </button>
                        : <Link to='/users/login'><p id='sign-in'>Sign in</p></Link>
                        }
                        
                        <p id='cart'>Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;