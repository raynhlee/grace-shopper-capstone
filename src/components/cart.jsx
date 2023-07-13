import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData }) {

  const getCart = async() => {
    const myCart = await fetchFromAPI({
      path: `/orders/${user.username}`
    })
    console.log(myCart);
    setCartData(myCart);
  }

  

  useEffect(() => {
    const loadCart = async () => {
        await getCart()
    }
    loadCart();
}, []);


  return (
    <>
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
                <CartItem cardData={item} />
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
        <Button size="large" color="primary">
          Edit Cart
        </Button>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Button size="large" color="primary">
            Checkout
          </Button>
        </Link>
      </div>
      </div>
      
    </>
  );
}

export default Cart;
