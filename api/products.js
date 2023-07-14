const express = require("express");
const productsRouter = express.Router();

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById
} = require("../db");

productsRouter.get("/", async (req, res, next) => {
  try {
    const getProducts = await getAllProducts();
    res.send(getProducts);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  const {id} = req.params;
  try {
    const getProduct = await getProductById(id);
    res.send(getProduct);
  } catch (error) {
    next(error)
  }
}) 

productsRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, price, stock, type, image } = req.body;
    const postProduct = await createProduct({
      name,
      description,
      price,
      stock,
      type,
      image
    });
    res.send(postProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, type } = req.body;

    updateProduct = await updateProduct({
      id,
      name,
      description,
      price,
      stock,
      type
    });
    res.send(updateProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteProduct({ id });
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
