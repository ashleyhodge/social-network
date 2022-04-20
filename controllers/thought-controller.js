
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  },
  // GET a single thought by _id
  getThoughtById({params}, res) {
    Thought.findOne({ _id: params.thoughtId })
    .select('-__v')
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thought found!'});
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // POST to create and add new thought (associate user)
  addThought({ params,body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // PUT to update a thought by _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found!' });
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // DELETE to remove a thought by _id
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No thought found!' });
        return;
      }
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: {thoughts: params.thoughtId } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found!'});
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  // POST to create a reaction stored in a single thoughts reaction array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found!' });
        return;
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  }
}

module.exports = thoughtController;