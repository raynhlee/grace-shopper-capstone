import React, {useState} from 'react';

const Header = () => {

    return (
        <div id='header-main-div'>
            <div id='header-main-section'>
                <h1 id='site-main-header'>guitarget</h1>
                <div id='nav-bar'>
                    <p id='categories'>Categories</p>
                    <form id='search-bar-div'>
                        <input id='search-bar' type="text" placeholder='What can we help you find?'></input>
                    </form>
                    <div id='header-account-buttons-div'>
                        <p id='sign-in'>Sign in</p>
                        <p id='cart'>Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;