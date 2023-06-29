const express = require('express');
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser,
    updateOrder
} = require('../db');

ordersRouter.get('/', async(req, res, next) => {
    try{

        const orders = await getAllOrders();
        res.send(orders)

    } catch (error){
        console.log(error)
    }

})

ordersRouter.get('/:username', async(req, res, next) => {
    const {username} = req.params;

    try{
        const orders = await getOrderByUser(username);
        res.send(orders)

    } catch(error){
        console.log(error)
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
        
        console.log(error);
    }


})

ordersRouter,
module.exports = ordersRouter;