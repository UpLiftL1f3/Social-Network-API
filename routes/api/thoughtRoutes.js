const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThought).post(createThought);

// /api/thoughts/:courseId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:THOUGHTid/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// api/thoughts/:THOUGHTid/:reactionId
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
