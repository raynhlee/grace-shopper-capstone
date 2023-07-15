import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Header = ({ token, setToken, setUser, setProductType, user, setCartData }) => {
  const history = useHistory();
  useEffect(() => {
    if (user) {
      return;
    }
    try {
      Promise.all([fetchFromAPI({ path: `/users/me` })]).then(([data]) => {
        setUser(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div id="header-container">
      <div id="red-bar-on-top-of-header">
        {token ? (
          <div id="red-stripe">
            <p> Store location closest to you: San Jose</p>
            <p id="hello">Hello, {user.username}</p>
          </div>
        ) : (
          <p>40% all electric guitars! Prices as marked</p>
        )}
        {
          user.isAdmin
          ? <Link  id="view-all-users" to='/admin/viewallusers'><p></p>View all users</Link>
          : null
        }
      </div>
      <div id="header-main-div">
        <div id="header-main-section">
          <Link to="/">
            <h1 id="site-main-header">guitarget</h1>
          </Link>
          <div id="nav-bar">
            <div className="dropdown">
              <button id="categories" className="dropbtn">
                Products
              </button>
              <div className="dropdown-content">
                <Link to="/products">
                  <button
                    className="nav-buttons"
                    onClick={(event) => {
                      setProductType("acoustic");
                    }}
                  >
                    Acoustic Guitars
                  </button>
                </Link>
                <Link
                  to="/products"
                  onClick={(event) => {
                    setProductType("electric");
                  }}
                >
                  <button className="nav-buttons">Electric Guitars</button>
                </Link>
                <Link to="/products">
                  <button
                    className="nav-buttons"
                    onClick={(event) => {
                      setProductType("picks");
                    }}
                  >
                    Guitar Picks
                  </button>
                </Link>
                <Link to="/products">
                  <button
                    className="nav-buttons"
                    onClick={(event) => {
                      setProductType("amps");
                    }}
                  >
                    Amps
                  </button>
                </Link>
              </div>
            </div>
            <form id="search-bar-div">
              <input
                id="search-bar"
                type="text"
                placeholder="What can we help you find?"
              ></input>
            </form>
            <div id="header-account-buttons-div">
              {token ? (
                <div id="header-account-buttons">
                  <button
                    id="logout-button"
                    onClick={(event) => {
                      event.preventDefault();
                      setToken("");
                      setUser("");
                      setCartData([]);
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      history.push("/");
                    }}
                  >
                    Logout{" "}
                  </button>
                </div>
              ) : (
                <Link to="/users/login">
                  <p id="sign-in"> Sign in</p>
                </Link>
              )}
              

              <Link to="/cart">
                <div id="cart"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
