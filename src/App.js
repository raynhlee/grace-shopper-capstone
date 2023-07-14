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
  Cart,
  SingleProduct,
  ConfirmOrder,
  PostNewProduct,
  ViewAllUsers
} from "./components";

function App() {
  const [products, setProducts] = useState([]);
  const [onSingleProductPage, setOnSngleProductPage] = useState(false);
  const [count, setCount] = React.useState(0);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cartData, setCartData] = useState([]);
  const [productType, setProductType] = useState(null);
  const [singleProductId, setSingleProductId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartFinalPrice, setCartFinalPrice] = useState(0);
  const [cartTax, setCartTax] = useState(0);

  const nonfunctionalButton = () => {
    alert("This feature is not currently available in your area :( ");
  };

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }, [token, user]);

  return (
    <div className="App">
      <Header
        token={token}
        setToken={setToken}
        setUser={setUser}
        setProductType={setProductType}
        user={user}
        setCartData={setCartData}
      />
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
      <Route exact path="/products">
        <Products
          exact
          path="/products"
          products={products}
          setProducts={setProducts}
          count={count}
          setCount={setCount}
          user={user}
          productType={productType}
          setSingleProductId={setSingleProductId}
          orderId={orderId}
          setOrderId={setOrderId}
          setOnSngleProductPage={setOnSngleProductPage}
          onSingleProductPage={onSingleProductPage}
          nonfunctionalButton={nonfunctionalButton}
          token = {token}
        />
      </Route>
      <Route exact path="/cart">
        <Cart
          user={user}
          setCartData={setCartData}
          cartData={cartData}
          products={products}
          orderId={orderId}
          setOrderId={setOrderId}
          cartSubtotal={cartSubtotal}
          setCartSubtotal={setCartSubtotal}
          cartFinalPrice = {cartFinalPrice}
          setCartFinalPrice={setCartFinalPrice}
          cartTax = {cartTax}
          setCartTax ={setCartTax}
        />
      </Route>
      <Route exact path="/">
        <DefaultHomepage />
      </Route>
      <Route exact path="/products/:id">
        <SingleProduct
          nonfunctionalButton={nonfunctionalButton}
          count={count}
          setCount={setCount}
          setProducts={setProducts}
          products={products}
          user={user}
          setOnSngleProductPage={setOnSngleProductPage}
          onSingleProductPage={onSingleProductPage}
        />
      </Route>
      <Route exact path = "/cart/confirmorder">
        <ConfirmOrder 
        cartData={cartData} 
        setCartData={setCartData} 
        cartSubtotal={cartSubtotal}
        cartFinalPrice = {cartFinalPrice}
        cartTax = {cartTax}
        />
      </Route>
      <Route path = '/admin/newproduct'>
        <PostNewProduct />
      </Route>
      <Route path = '/admin/viewallusers'>
        <ViewAllUsers />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
