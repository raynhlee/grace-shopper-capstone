import React, { useEffect } from "react";

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
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
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
    </>
  );
}

export default Cart;
