const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');
// const { create } = require('../../models/User');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:studentId/assignments/:assignmentId
router.route('/:userId/friend/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
