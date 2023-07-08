const express = require('express');
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewsByUser, 
    getReviewsByProduct, 
    createReview, 
    updateReview, 
    deleteReview
} = require('../db');

// GET /reviews
reviewsRouter.get('/', async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send(reviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /reviews/:username
reviewsRouter.get('/:username', async (req, res, next) => {
  const { username } = req.params;

  try {
    const reviews = await getReviewsByUser(username);
    res.send(reviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// GET /reviews/:productId
reviewsRouter.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviews = await getReviewsByProduct(productId);
    res.send(reviews);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST /reviews/:productId
reviewsRouter.post('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { creatorId, description } = req.body;

  try {
    const review = await createReview({ creatorId, productId, description });
    res.send(review);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH /reviews/:reviewId
reviewsRouter.patch('/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;
  const { id, ...fields } = req.body;

  try {
    await updateReview({ id: reviewId, ...fields });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE /reviews/:reviewId
reviewsRouter.delete('/:reviewId', async (req, res, next) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await deleteReview(reviewId);
    res.send(deletedReview);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = reviewsRouter;
