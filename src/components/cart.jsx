import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import swal from "sweetalert";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link, useHistory } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData }) {
  const history = useHistory();
  useEffect(() => {
    try {
      //todo getOrderByUser
      Promise.all([
        fetchFromAPI({ path: `/orders/${user.user.username}` }),
      ]).then(([data]) => {
        setCartData(data);
        console.log("cartData: ", cartData);
        console.log("data: ", data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    swal(
      "Thank you for your order! Confirmation email will be arriving shortly."
    ).then(() => {
      history.replace("/");
    });
    //todo
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
        <Button size="large" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </>
  );
}

export default Cart;
