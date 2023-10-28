const express = require('express');
const router = express.Router();

const {authenticateVolunteer} = require('../middlewares/authMiddleware')

const {registerVolunteer, loginVolunteer, getMe, getDirectors, getUsers} = require('../controllers/volunteerController');

router.route('/register').post(authenticateVolunteer,registerVolunteer)
router.route('/login').post(loginVolunteer)

router.route('/profile').get(authenticateVolunteer,getMe)
router.route('/directors').get(authenticateVolunteer,getDirectors)
router.route('/users').get(authenticateVolunteer,getUsers)

module.exports = router;
