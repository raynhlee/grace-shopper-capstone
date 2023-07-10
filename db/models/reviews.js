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
        const { rows: allReviews } = await client.query(
            `SELECT *
            FROM reviews;`
        )
        return allReviews;

    } catch (error){
        console.error(error)
    }

}

async function getReviewsByProduct(productId){

    try{
        const {rows: [review]} = await client.query(`
        SELECT * 
        FROM reviews
        WHERE "productId"=$1;
        `, [productId]);

        return review;
    } catch(error){
        console.error(error)
    }

}

async function getReviewsByUser(creatorId){
    try {
        const {rows: [review]} = await client.query(`
        SELECT * 
        FROM reviews
        WHERE "creatorId"=$1
        `, [creatorId]);

        return review;

    } catch(error){
        console.error(error)
    }

}

async function updateReview({id, ...fields}){
    const setString = Object.keys(fields)
    .map((key, idx) => `${key} = $${idx + 1}`)
    .join(", ");

    if (setString.length === 0){
        return;
    }

    try {
        const {rows: [review]} = await client.query(`
        UPDATE reviews
        SET ${setString}
        WHERE id=$1
        RETURNING *;
        `, [id, ...Object.values(fields)]);

        return review;
    } catch (error){
        console.error(error);
    }
}

async function deleteReview(reviewId){
    try {
        const {rows: [response]} = await client.query(`
        DELETE reviews
        WHERE id=$1
        RETURNING *;
        `, [reviewId]);

        return response;

    } catch (error){
        console.error(error)
    }


}

module.exports = {
    createReview,
    getAllReviews,
    getReviewsByProduct,
    getReviewsByUser,
    updateReview,
    deleteReview
}