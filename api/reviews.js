const express = require('express');
const reviewsRouter = express.Router();
const { 
    getAllReviews, 
    getReviewsByUser, 
    getReviewsByProduct, 
    createReview, 
    updateReview, 
    deleteReview
} = require('../db/models/reviews');

// GET /reviews
reviewsRouter.get('/reviews', async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
});

// GET /reviews/:username
reviewsRouter.get('/reviews/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const reviews = await getReviewsByUser(username);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
});

// GET /reviews/:productId
reviewsRouter.get('/reviews/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await getReviewsByProduct(productId);
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching reviews' });
  }
});

// POST /reviews/:productId
reviewsRouter.post('/reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  const { creatorId, description } = req.body;

  try {
    const review = await createReview({ creatorId, productId, description });
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a review' });
  }
});

// PATCH /reviews/:reviewId
reviewsRouter.patch('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { id, ...fields } = req.body;

  try {
    await updateReview({ id: reviewId, ...fields });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the review' });
  }
});

// DELETE /reviews/:reviewId
reviewsRouter.delete('/reviews/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await deleteReview(reviewId);
    res.json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the review' });
  }
});

module.exports = reviewsRouter;
