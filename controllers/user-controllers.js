const User  = require('../models/User')

const userController = {
  // GET all users
  getAllUser(req, res) {
    User.find({})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // GET single user by _id and populate thought and friend data
  getUserById({ params}, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No user found!' })
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  },
  // POST a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // PUT to update a user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user found!' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  // DELETE to remove user by _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user found!' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      })
  }
}

module.exports = userController;