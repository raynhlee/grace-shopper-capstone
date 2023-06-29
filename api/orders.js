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

module.exports = ordersRouter;