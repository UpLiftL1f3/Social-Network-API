const { Thought, User } = require('../models');

module.exports = {
  // Get all courses
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((data) =>
        !data
          ? res
              .status(404)
              .json({ message: 'No thought associated with this id' })
          : res.json(data)
      )
      .catch((err) => {
        if (err) throw err;
        res.status(500).json(err);
      });
  },
  // Create a course
  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      console.log('thought successfully added', newThought);
      const userThought = await User.findOneAndUpdate(
        { username: newThought.username },
        { $push: { thoughts: newThought._id } },
        { new: true, runValidators: true }
      );
      console.log('User Thought successfully added', userThought);

      if (!userThought) {
        res.status(404).json({ message: 'Problem while creating thought' });
      } else {
        res.json(userThought);
      }
    } catch (err) {
      if (err) throw err;
      res.status(500).json(err);
    }
  },
  // Delete a course
  deleteThought: async (req, res) => {
    try {
      console.log('in the loop 1');
      const removedThought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      console.log(`${removedThought._id}`);
      if (removedThought) {
        console.log('in the loop 2');
        const removedThoughtUser = await User.findOneAndUpdate(
          { username: removedThought.username },
          { $pull: { thoughts: removedThought._id } },
          { runValidators: true, new: true }
        );
        console.log(`${removedThoughtUser}`);

        res.json({ message: 'thought deleted!' });
      } else {
        console.log('in the loop 3');
        res.status(404).json({ message: 'No thought with that ID' });
      }
    } catch (err) {
      console.log('in the loop 4');
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'Thought not found' })
          : res.json(data)
      )
      .catch((err) => {
        if (err) throw err;
        res.status(500).json(err);
      });
  },

  // add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // pushes reactions array
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'Thought not found' })
          : res.json(data)
      )
      .catch((err) => {
        if (err) throw err;
        res.status(500).json(err);
      });
  },
  // delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      // removes reactions array
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((data) =>
        !data
          ? res.status(404).json({ message: 'Not found with this ID' })
          : res.json(data)
      )
      .catch((err) => {
        if (err) throw err;
        res.status(500).json(err);
      });
  },
};
