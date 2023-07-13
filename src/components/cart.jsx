import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import swal from "sweetalert";

import Grid from "@mui/material/Grid";
import CartItem from "./cartitem";
import { Link, useHistory } from "react-router-dom";

import { fetchFromAPI } from "../api";

function Cart({ user, cartData, setCartData }) {
  const history = useHistory();
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

  const handleCheckout = async () => {
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
    swal(
      "Thank you for your order! Confirmation email will be arriving shortly."
    ).then(() => {
      history.push("/");
    });
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
    </>
  );
}

export default Cart;
