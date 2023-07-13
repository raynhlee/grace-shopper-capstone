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
        const orderIds = orderHistory.map(order => order.orderId);

       const orderArr = await Promise.all(orderIds.map(async (id) => {
        const order = await getOrderById(id);
        return order;
       }));

        console.log("orderArr: ", orderArr);

        res.send(orderArr);
    } catch (error) {
        next(error);
    }
});

historyRouter.post('/:username', async (req, res, next) => {
    const { username } = req.params;
    try {
        const usersOrders = await getOrderByUser({username});

        const ids = usersOrders.map(order => order.id);
        const customersName = usersOrders.map(customer => customer.customerName);
        console.log("ids: ", ids);
        console.log("customersName: ", customersName);

        const addToHistory = await Promise.all(ids.map(async (id) => {
            const addToHistory = await createOrderHistory(id, customersName[0]);
            return addToHistory;
          }));


          console.log("addToHistory: ", addToHistory);

        res.send(addToHistory);
    } catch (error) {
        next(error);
    }
});


module.exports = historyRouter;