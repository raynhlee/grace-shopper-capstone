import React, { useEffect, useState } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//todo won't let me file path to db
const { getAllProducts, updateProduct, createOrder } = require("../");

//todo make all product types route to /products?

function Products({ products, setProducts, count, setCount, username }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpen = (product) => {
    setSelectedProduct(product);
  };

  const addToCart = async (product) => {};

  useEffect(() => {
    try {
      Promise.all([getAllProducts()]).then(([data]) => {
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product, index) => (
            <Card key={index} id={index}>
              <CardMedia image={product.img && product.img} />
              <CardContent>
                <Typography>{product.title}</Typography>

                <Typography>{product.description}</Typography>

                <Typography>${product.price}</Typography>

                <Typography>Stock : {product.stock}</Typography>
              </CardContent>

              <CardActions>
                {product.reviews.length !== 0 ? (
                  <Button
                    size="small"
                    type="button"
                    onClick={handleOpen(product)}
                  >
                    Reviews
                  </Button>
                ) : null}

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