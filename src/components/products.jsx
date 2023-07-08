import React, { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";

import { fetchFromAPI } from "../api";

//todo make all product types route to /products?

function Products({ products, setProducts, count, setCount, username, user }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = async (product) => {
    setCount(count + 1);
    let newStock = product.stock - 1;

    if (count === 1) {
      //todo createOrder
      const order = await fetchFromAPI({
        path: "/orders",
        userId: user.id,
        product: product.id,
        price: product.price,
        quantity: 1,
      });
      localStorage.setItem("orderid", order.orderid);

      //todo updateProduct
      await fetchFromAPI({
        path: "/products",
        id: product.id,
        stock: newStock,
      });

      //todo getAllProducts
      Promise.all([await fetchFromAPI({ path: "/products" })]).then(
        ([data]) => {
          setProducts(data);
        }
      );

      try {
        Promise.all([fetchFromAPI({ path: "/products" })]).then(([data]) => {
          setProducts(data);
        });
      } catch (error) {
        console.log(error);
      }
      //todo updateProduct to -1
      await fetchFromAPI({ path: "/products" });
    }
  };

  //todo need to filter through products based on type clicked
  useEffect(() => {
    try {
      Promise.all([fetchFromAPI({ path: "/products" })]).then(([data]) => {
        setProducts(data);
      });
      console.log("products: ", products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.length &&
            products.map((product, index) => (
              <Card
                key={index}
                id={index}
                style={{ width: "20%", margin: "2%" }}
              >
                <CardMedia>
                  <img
                    src={product.image && product.image}
                    alt={product.title}
                    height={200}
                  />
                </CardMedia>
                <CardContent>
                  <Typography>{product.title}</Typography>

                  <Typography>{product.description}</Typography>

                  <Typography>${product.price}</Typography>

                  <Typography>Stock : {product.stock}</Typography>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    endIcon={<ShoppingCartIcon />}
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}

export default Products;
