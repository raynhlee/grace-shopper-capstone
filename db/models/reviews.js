const client = require("../client");

async function createReview({creatorId, productId, description}){

    try {
        const {rows: [review]} = await client.query(`
        INSERT INTO reviews("creatorId", "productId", description)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [creatorId, productId, description]);

        return review;
    } catch({error}){
        console.error(error)
    }

}

async function getAllReviews(){
    try {
        const allReviews = await client.query(
            `SELECT *
            FROM reviews;`
        )
        return allReviews;

    } catch (error){
        console.error(error)
    }

}

async function getReviewByProduct(productId){

    try{
        const {rows: [review]} = await client.query(`
        SELECT * 
        FROM reviews
        WHERE "productId" = $1;
        `, [productId])
    } catch(error){
        console.error(error)
    }

}

async function getReviewByUser(){

}

async function updateReview(){

}

async function deleteReview(){

}

module.exports = {
    createReview,
    getAllReviews,
    getReviewByProduct
}