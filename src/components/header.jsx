import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Header = ({ token, setToken, setUser, setProductType }) => {
  return (
    <div id="header-container">
      <div id="red-bar-on-top-of-header">
        <p>40% all electric guitars! Prices as marked</p>
      </div>
      <div id="header-main-div">
        <div id="header-main-section">
          <Link to="/">
            <h1 id="site-main-header">guitarget</h1>
          </Link>
          <div id="nav-bar">
            <div className="dropdown">
              <button id="categories" className="dropbtn">
                Categories
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
                <button
                  id="logout-button"
                  onClick={(event) => {
                    event.preventDefault();
                    setToken("");
                    setUser("");
                    localStorage.removeItem("token");
                  }}
                >
                  Logout{" "}
                </button>
              ) : (
                <Link to="/users/login">
                  <p id="sign-in"> Sign in</p>
                </Link>
              )}

              <div id="cart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
