
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
    Thought.findOne({ _id: params.id })
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
        { $push: { thoughts: _id } },
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
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
    Thought.findOneAndDelete({ _id: params.id })
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
  }
}

module.exports = thoughtController;