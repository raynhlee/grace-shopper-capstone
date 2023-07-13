const express = require("express");
const ordersRouter = express.Router();
const { requireUser } = require("./utils");

const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
} = require("../db");

ordersRouter.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  console.log(username);

  try {
    const orders = await getOrderByUser({ username });
    console.log("Hello, orders");
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    console.log("All orders");
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  const { productId, price, quantity, userId} = req.body;

  let orderData = {
    userId,
    productId,
    price,
    quantity,
  };

  try {
    console.log("hello");

    console.log("orderData: ", orderData);
    const newOrder = await createOrder(orderData);

    console.log(newOrder);

    res.send({
      message:
        "Thank you for your order! Confirmation email will be arriving shortly.",
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch ("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  const { quantity, price } = req.body;

  try {
    const updatedOrder = await updateOrder({
      orderId,
      quantity,
      price
    });
    res.send(updatedOrder);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const orderToBeDeleted = await getOrderById(orderId);

    if (orderToBeDeleted.userId === req.user.id) {
      const deletedOrder = await deleteOrder(orderToBeDeleted.id);
      res.send(deletedOrder);
    } else {
      res.status(403).json({
        error: "Unauthorized User",
        name: "UnauthorizedUserError",
        message: `User ${req.user.username} is not allowed to delete Order ${orderToBeDeleted.id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
