import React, { useEffect, useState } from "react";
import { Link, useHistory, Route } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import swal from "sweetalert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

import { fetchFromAPI } from "../api";
import AddToCart from "./addToCart";
//todo make all product types route to /products?

function Products({
  products,
  setProducts,
  count,
  setCount,
  user,
  productType,
  orderId,
  setOrderId,
}) {
  const addToCart = async (product) => {
    console.log("adding to cart");

    swal("Added to cart!");

    setCount(count + 1);
    let newStock = product.stock - 1;

    if (count === 1) {
      //todo createOrder
      const order = await fetchFromAPI({
        path: "/orders",
        method: "POST",
        body: {
          userId: user.id,
          productId: product.id,
          price: product.price,
          quantity: 1,
        },
        token: user.token,
      });
      localStorage.setItem("orderid", order.orderid);

      //todo updateOrder
      if (count >= 2) {
        await fetchFromAPI({
          path: "/orders",
          method: "PUT",
        });
      }

      //todo updateProduct
      await fetchFromAPI({
        path: "/products",
        body: {
          id: product.id,
          stock: newStock,
        },
      });

      //todo getAllProducts; might not need this
      Promise.all([await fetchFromAPI({ path: "/products" })]).then(
        ([data]) => {
          setProducts(data);
        }
      );
    }
  };

  useEffect(() => {
    try {
      Promise.all([fetchFromAPI({ path: "/products" })]).then(([data]) => {
        let filteredProducts = [];
        data.map((product, index) => {
          if (product.type === productType) {
            filteredProducts.push(product);
          }
        });
        setProducts(filteredProducts);
      });
      console.log("products: ", products);
    } catch (error) {
      console.log(error);
    }
  }, [productType]);

  return (
    <>
      <div>
        <h1 id="product-page-header">{productType}</h1>
        <div id="products-div">
          <div id="how-are-shopping">
            <h2 id="how-shop-header">How are you shopping today?</h2>
            <div id="pickup-div">
              <h3 id="pickup-method"> Pickup</h3>
              <p id="pickup-desc">In-store pickup, ready within 2 hours</p>
            </div>
            <div id="pickup-div">
              <h3 id="pickup-method">Same Day Delivery</h3>
              <p>Schedule contactless deliveries as soon as today</p>
            </div>
            <div id="pickup-div">
              <h3 id="pickup-method">Shipping</h3>
              <p>Free with FretCard or $350 orders*</p>
            </div>
            <div id="exclusions-div">
              <p id="exclusions">*Exclusions apply</p>
            </div>
          </div>
          <div id="products-container">
            <div>
              <h3 id="num-results">{products.length} results</h3>
            </div>
            <div id="all-products">
              {products.length &&
                products.map((product, index) => (
                  <Card
                    key={index}
                    id={index}
                    style={{
                      boxShadow: "none",
                      borderRadius: "0px",
                      width: "28%",
                      marginBottom: "20px",
                      marginLeft: "10px",
                    }}
                    className="product-card"
                  >
                    <CardMedia>
                      <img
                        className="product-image"
                        src={product.image && product.image}
                        alt={product.title}
                        height={200}
                      />
                    </CardMedia>
                    <CardContent>
                      <Link to={`/products/${product.id}`}>
                        <button id="product-title">{product.name}</button>
                      </Link>
                      <Typography>${product.price}</Typography>
                      <p id="when-purchased-online">When purchased online</p>
                    </CardContent>
                    <AddToCart
                      product={product}
                      count={count}
                      setCount={setCount}
                      setProducts={setProducts}
                      user={user}
                      orderId={orderId}
                      setOrderId={setOrderId}
                    />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
