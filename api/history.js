const historyRouter = require('express').Router();
const {
    createOrderHistory,
    getOrderHistory,
    getOrderByUser,
    getOrderById
} = require('../db');


historyRouter.get('/:username', async (req, res, next) => {
    const { username } = req.params;
    try {
        const orderHistory = await getOrderHistory(username);
        console.log("orderHistory: ", orderHistory);
        const orderIds = orderHistory.map(order => order.orderId);
        console.log("orderIds: ", orderIds);

        orderIds.forEach(async (id) => {
            const orders = await getOrderById(id);
            console.log("orders: ", orders);
        });

        // orderHistory.forEach(order => async);
        res.send(orderHistory);
        
    } catch (error) {
        next(error);
    }
});

historyRouter.post('/:username', async (req, res, next) => {
    const { username } = req.params;
    try {
        const usersOrders = await getOrderByUser({username});

        console.log("usersOrders: ", usersOrders);
        
        const ids = usersOrders.map(order => order.id);
        const customersName = usersOrders.map(customer => customer.customerName);
        console.log("ids: ", ids);
        console.log("customersName: ", customersName);

        ids.forEach(async (id) => {
            const addToHistory = await createOrderHistory(id, customersName[0]);
            console.log("addToHistory: ", addToHistory);
        });
        res.send(addToHistory);
    } catch (error) {
        next(error);
    }
});


module.exports = historyRouter;