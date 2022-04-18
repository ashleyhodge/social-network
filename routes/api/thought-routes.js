const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought
} = require('../../controllers/thought-controller');

router
  .route('/')
  .get(getAllThoughts);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

router
  .route('/:userId')
  .post(addThought)

module.exports = router;