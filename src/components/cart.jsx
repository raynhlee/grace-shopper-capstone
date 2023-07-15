import React, { useEffect, useState } from "react";


import Swal from "sweetalert2";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link, useHistory } from "react-router-dom";

import { fetchFromAPI } from "../api";
import { red } from "@mui/material/colors";

function Cart({ user, cartData, setCartData, cartSubtotal, setCartSubtotal, cartFinalPrice, setCartFinalPrice, cartTax, setCartTax }) {
  const history = useHistory();
  
  
  let currentTax;
  let currentFinalPrice;
  let newSubtotal = 0;

  const getCart = async () => {
    const myCart = await fetchFromAPI({
      path: `/orders/${user.username}`,
    });
    console.log(myCart);
    setCartData(myCart);

    const calculateTotal = async() => {
      myCart.forEach(element => {
        console.log(element)
        let priceNum = parseFloat(element.price)
        newSubtotal += priceNum;
      });
      console.log(newSubtotal);
     
      console.log('cart subtotal: ', cartSubtotal)
      
      newSubtotal = newSubtotal.toFixed(2)
      currentTax = parseFloat((newSubtotal * 0.0725)).toFixed(2) 
      console.log('cart tax: ', currentTax);
  
      currentFinalPrice = ((parseFloat(currentTax) + parseFloat(newSubtotal)).toFixed(2));
      console.log('final price: ', currentFinalPrice);
      
    }

    calculateTotal()
   
    setCartSubtotal(newSubtotal);
    setCartTax(currentTax);
    setCartFinalPrice(currentFinalPrice);
   
  };

  const onDelete = async () => {
    Swal.fire({
      icon: 'success',
      iconColor: '#cc0000',
      title: 'Success',
      text: 'Product has been removed from your cart',
      showConfirmButton: false,
      timer: 2000
    });
    getCart();
  };

  useEffect(() => {
    const loadCart = async () => {
      await getCart();
    };
    loadCart();
  }, []);


  return (
    <div id='cart-page'>
    <h1 id='cart-header'>Cart</h1>
    <h3 id='cart-subtotal'>Subtotal: ${cartSubtotal} </h3>
    <div id='cart-container'>
     
      <div id='cart-main-div'>
        <div id='my-order-and-cart-items'>
        <h3 id='my-order'>My order</h3>
        {cartData.length > 0
          ? <p id='cart-items-in-cart-list'>{cartData.length} item(s)</p>
          : <p id='no-items-in-cart'>No items currently in cart</p>
        }
        </div>
        {cartData &&
          cartData.map((item, index) => {
            return (
              <Grid key={index} wrap="wrap-reverse" style={{ margin: "1rem" }}>
                <CartItem cardData={item} onDelete={onDelete} />
              </Grid>
            );
          })}
      </div>
      <div id='order-summary-aside'>
        <h3 id='order-summary-aside-header'>Order summary</h3>
        <div id='order-summary-aside-subtotal-div'>
          {cartData.length > 1
            ? <p id='order-summary-aside-subtotal-label'>Subtotal ({cartData.length} items)</p>
            : <p id='order-summary-aside-subtotal-label'>Subtotal (1 item)</p>
          }
          <p id='order-summary-aside-subtotal'>${cartSubtotal}</p>
        </div>
        <div id='order-summary-aside-subtotal-div'>
          <p id='order-summary-aside-subtotal-label'>Regional fees</p>
          <p id='order-summary-aside-subtotal'>$1</p>
        </div>
        <div id='order-summary-aside-subtotal-div'>
          <p id='order-summary-aside-subtotal-label'>Estimated tax</p>
          <p id='order-summary-aside-subtotal'>${cartTax}</p>
        </div>
        <div id='order-summary-aside-total-div'>
          <p>Total</p>
          <p>${cartFinalPrice}</p>
        </div>
       <Link to="/cart/confirmorder"><button id='check-out-button'>Check out</button></Link>
      </div>
      </div>
      
      
    </div>
  );
}

export default Cart;
