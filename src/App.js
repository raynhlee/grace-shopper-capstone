import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Swal from 'sweetalert2';
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
  ViewAllUsers,
  SearchProducts
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
  const [searchTerm, setSearchTerm] = useState('')

  const nonfunctionalButton = () => {
    Swal.fire({
      icon: 'error',
      title: 'No Stores Found',
      text: "This feature is not currently available in your area."
    });
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
        setSearchTerm = {setSearchTerm}
        searchTerm = {searchTerm}
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
          token={token}
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
        <PostNewProduct token={token}/>
      </Route>
      <Route path = '/admin/viewallusers'>
        <ViewAllUsers token={token} />
      </Route>
      <Route exact path = '/searchproducts'>
        <SearchProducts 
        setOnSngleProductPage = {setOnSngleProductPage}
        onSingleProductPage={onSingleProductPage}
        searchTerm = {searchTerm} 
        count={count}
        setCount={setCount}
        setProducts={setProducts}
        user={user}
        token = {token}/>
      </Route>
      <Footer />
    </div>
  );
}

export default App;
