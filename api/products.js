const express = require("express");
const productsRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../db");

productsRouter.get("/products", async (req, res, next) => {
  try {
    const getProducts = await getAllProducts();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});

productsRouter.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, stock } = req.body;
    const postProduct = await createProduct({
      name,
      description,
      price,
      stock,
    });
    res.send(postProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    updateProduct = await updateProduct({
      id,
      name,
      description,
      price,
      stock,
    });
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProduct({ id });
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});
