import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import swal from "sweetalert";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link, useHistory } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData, orderId, setOrderId }) {
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [cartFinalPrice, setCartFinalPrice] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  
  let currentTax;
  let currentFinalPrice;
  let newSubtotal = 0;

  const getCart = async () => {
    const myCart = await fetchFromAPI({
      path: `/orders/${user.username}`,
    });
    console.log(myCart);
    setCartData(myCart);
  };

  const onDelete = async () => {
    getCart();
  };

  useEffect(() => {
    setCartSubtotal(0)
    const loadCart = async () => {
      await getCart();
    };
    loadCart();

    

    cartData.forEach(element => {
      console.log(element)
      let priceNum = parseFloat(element.price)
      newSubtotal += priceNum;
    });
    console.log(newSubtotal);
   
    console.log('cart subtotal: ', cartSubtotal)
    
    newSubtotal = newSubtotal.toFixed(2)
    currentTax = parseFloat((newSubtotal * 0.0725)).toFixed(2) 
    console.log('cart tax: ', currentTax);

    currentFinalPrice = parseFloat(currentTax) + parseFloat(newSubtotal);
    console.log('final price: ', currentFinalPrice);

    setCartSubtotal(newSubtotal);
    setCartTax(currentTax);
    setCartFinalPrice(currentFinalPrice);
 
  }, []);

  

  const handleCheckout = async (e) => {
    e.preventDefault();
    swal(
      "Thank you for your order! Confirmation email will be arriving shortly."
    ).then(() => {
      history.replace("/");
    });
    //todo deleteOrder? might not need this
    Promise.all(
      cartData.map((order) =>
        fetchFromAPI({
          path: `orders/${order.id}`,
          method: "delete",
        })
      )
    );
    setCartData([]);
  };

  

  return (
    <>
    <h1 id='cart-header'>Cart</h1>
    <h3 id='cart-subtotal'>Subtotal: ${cartSubtotal} </h3>
    <div id='cart-container'>
     
      <div id='cart-main-div'>
        <h3 id='my-order'>My order</h3>
        {cartData.length > 1
          ? <p id='cart-items-in-cart-list'>{cartData.length} items</p>
          : <p id='cart-items-in-cart-list'>1 item</p>
        }
        {cartData &&
          cartData.map((item, index) => {
            return (
              <Grid key={index} wrap="wrap-reverse" style={{ margin: "1rem" }}>
                <CartItem cardData={item} onDelete={onDelete} />
              </Grid>
            );
          })}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
       
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
        <button id='check-out-button'>Check out</button>
      </div>
      </div>
      
      
    </>
  );
}

export default Cart;
