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
    
}

async function getOrderById(){
    
}

async function getOrderByUser(){
    
}

async function updateOrder(){
    
}

async function deleteOrder(){
    
}
