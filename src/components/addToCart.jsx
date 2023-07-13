import React from "react";
import { fetchFromAPI } from "../api";

const AddToCart = ({
  product,
  count,
  setCount,
  setProducts,
  user,
  orderId,
  setOrderId,
}) => {
  const addToCart = async (product) => {
    let newStock = product.stock - 1;

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
    });
    //localStorage.setItem("orderid", order.id);
    setOrderId(order.newOrder.id);
    console.log("orderId: ", order.newOrder.id);
    console.log("order: ", order);

    //todo updateProduct
    await fetchFromAPI({
      path: "/products",
      id: product.id,
      stock: newStock,
    });

    /*

        if (count >= 2) {
          await fetchFromAPI({
            path: "/orders",
            method: "PATCH",
          });
        }
        */
  };

  return (
    <button onClick={() => addToCart(product)} id="add-to-cart-button">
      Add to cart
    </button>
  );
};

export default AddToCart;
