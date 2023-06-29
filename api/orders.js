const express = require('express');
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    updateOrder,
    deleteOrder
} = require('../db');

ordersRouter.get('/', async(req, res, next) => {
    try{

        const orders = await getAllOrders();
        res.send(orders)

    } catch (error){
        next(error);
    }

})

ordersRouter.delete('/:orderId', async (req, res, next) => {
    const {orderId} = req.params;

    try {

        const orderToBeDeleted = await getOrderById(orderId);

        if (orderToBeDeleted.userId === req.user.id){
            const deletedOrder = await deleteOrder(orderToBeDeleted.id);
            res.send(deletedOrder);
        } else {
            res.status(403).json({
                error: 'Unauthorized User',
                name: "UnauthorizedUserError",
                message: `User ${req.user.username} is not allowed to delete Order ${orderToBeDeleted.id}`
            });
        }

ordersRouter.get('/:username', async(req, res, next) => {
    const {username} = req.params;
<<<<<<< HEAD

    try{
        const orders = await getOrderByUser(username);
        res.send(orders)

    } catch(error){
        next(error);
    }

})

ordersRouter.post('/', async(req, res, next) => {
    const {productId, price, quantity} = req.body;

    const orderData = {};

    try{

        orderData.userId = req.user.id;
        orderData.productId = productId;
        orderData.price = price;
        orderData.quantity = quantity;

        const newOrder = await createOrder(orderData);

        res.send(newOrder);

    } catch(error){
        
        next(error);
    }

})

ordersRouter.delete('/:orderId', async (req, res, next) => {
    const {orderId} = req.params;

    try {

        const orderToBeDeleted = await getOrderById(orderId);

        if (orderToBeDeleted.userId === req.user.id){
            const deletedOrder = await deleteOrder(orderToBeDeleted.id);
            res.send(deletedOrder);
        } else {
            res.status(403).json({
                error: 'Unauthorized User',
                name: "UnauthorizedUserError",
                message: `User ${req.user.username} is not allowed to delete Order ${orderToBeDeleted.id}`
            });
        }

    } catch(error) {
        next(error);
    }
=======
>>>>>>> c89da26 (wrote ordersRouter.get for /:username)

    try{
        const orders = await getOrderByUser(username);
        res.send(orders)

    } catch(error){
        console.log(error)
    }

})


module.exports = ordersRouter;