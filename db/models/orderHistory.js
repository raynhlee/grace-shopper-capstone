const client = require('../client');

async function createOrderHistory(orderId, username) {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO "orderHistory"("orderId", username)
            VALUES ($1, $2)
            RETURNING *;
        `, [orderId, username]);

        return order;
    } catch (error) {
        console.error(error);
    }
}

async function getOrderHistory(username) {
    try {
        const { rows: orderHistory } = await client.query(`
            SELECT *
            FROM "orderHistory"
            WHERE username = $1;
        `, [username]);

        return orderHistory;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    createOrderHistory,
    getOrderHistory
}