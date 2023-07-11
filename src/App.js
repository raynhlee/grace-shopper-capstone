import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import {
  Header,
  DefaultHomepage,
  Products,
  Login,
  Register,
  Footer,
  MyAccount
} from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = React.useState(0);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);
  const [user, setUser] = useState([]);
  const [productType, setProductType] = useState(null);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} setUser={setUser} setProductType={setProductType} user={user}/>
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
      <Route path="/products">
        <Products
          path="/products"
          products={products}
          setProducts={setProducts}
          count={count}
          setCount={setCount}
          user={user}
          productType={productType}
        />
      </Route>
      <Route exact path="/">
        <DefaultHomepage />
      </Route>
      <Route path='/me'>
        <MyAccount />
      </Route>
       <Footer />
    </div>
  );
}

export default App;
