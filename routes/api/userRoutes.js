const router = require('express').Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteStudent,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');
// const { create } = require('../../models/User');

// /api/students
router.route('/').get(getAllUsers).post(createUser);

// /api/students/:studentId
router.route('/:studentId').get(getSingleUser).delete(deleteStudent);

// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
