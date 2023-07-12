import React, { useEffect } from "react";

import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData }) {
  useEffect(() => {
    try {
      //todo getOrderByUser
      Promise.all([
        fetchFromAPI({ path: `/orders/${user.user.username}` }),
      ]).then(([data]) => {
        setCartData(data);
        console.log("cartData: ", cartData);
      });
    } catch (error) {
      console.log(error);
    }
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