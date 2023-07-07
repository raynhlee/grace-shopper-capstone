import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import {
  Header,
  DefaultHomepage,
  AllProducts,
  Login,
  Register,
  Products,
} from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = React.useState(0);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} setUser={setUser} />
      <Route path="/users/login">
        <Login
          username={username}
          setUsername={setUsername}
          setToken={setToken}
          setUser={setUser}
        />
      </Route>
      <Route path="/users/register">
        <Register
          username={username}
          setUsername={setUsername}
          setToken={setToken}
          setUser={setUser}
        />
      </Route>
      <Route path="/guitars">
        <AllGuitars />
      </Route>
      <Route>
        <Products
          path="/products"
          products={products}
          setProducts={setProducts}
          count={count}
          setCount={setCount}
        />
      </Route>
      <Route exact path="/">
        <DefaultHomepage />
      </Route>
    </div>
  );
}

export default App;
