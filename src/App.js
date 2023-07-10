import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import {
  Header,
  DefaultHomepage,
  AllProducts,
  Login,
  Register,
  Footer
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
      <Route path="/products">
        <Products
          path="/products"
          products={products}
          setProducts={setProducts}
          count={count}
          setCount={setCount}
          user={user}
        />
      </Route>
      <Route exact path="/">
        <DefaultHomepage />
      </Route>
       <Route path='/products'>
          <AllProducts productsType={productsType}/>
       </Route>
       <Route exact path='/'>
         <DefaultHomepage />
       </Route>
       <Footer />
    </div>
  );
}

export default App;
