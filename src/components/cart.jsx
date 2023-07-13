import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import swal from "sweetalert";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link, useHistory } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData, orderId, setOrderId }) {
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
    const loadCart = async () => {
      await getCart();
    };
    loadCart();
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
        <Button size="large" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
      </div>
      
    </>
  );
}

export default Cart;
