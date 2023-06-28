const client = require("../client");

async function createOrder({userId, productId, price, quantity}){

    try{
        const {rows: [order]} = await client.query(`
        INSERT INTO orders("userId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [userId, productId, price, quantity])

        return order;
    } catch (error){
        console.error(error)
    }

}

async function getAllOrders(){
    try {
        const allOrders = await client.query(
            `SELECT *
            FROM orders;`
        )
        return allOrders;

    } catch (error){
        console.error(error)
    }

    
}

async function getOrderById(id){
    try{
        const {rows: [order]} = await client.query(`
        SELECT *
        FROM orders
        WHERE id=$1;
        `, [id]);

        return order;
    } catch(error){
        console.error(error)
    }
    
}

async function getOrderByUser(userId){
    try{
        const {rows: [order]} = await client.query(`
        SELECT *
        FROM orders
        WHERE "userId"=$1;
        `, [userId]);

        return order;
    } catch(error){
        console.error(error)
    }
}

async function updateOrder(){
    
}

async function deleteOrder(){
    
}


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrderByUser
}