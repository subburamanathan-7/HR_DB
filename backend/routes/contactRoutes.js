const express = require('express');
const router = express.Router();


const {listContacts, addContact, updateContact, deleteContact, globalList, getContact, transferContact, fileUpload} = require('../controllers/contactController')
const {authenticateVolunteer} = require('../middlewares/authMiddleware')

router.route('/').get(authenticateVolunteer,listContacts).post(authenticateVolunteer,addContact)
router.route('/:id').get(authenticateVolunteer,getContact).put(authenticateVolunteer,updateContact).delete(authenticateVolunteer,deleteContact)

router.route('/upload').post(authenticateVolunteer,fileUpload)
router.route('/list/globalHR').get(authenticateVolunteer,globalList)
router.route('/transfer/:id').put(authenticateVolunteer,transferContact)


module.exports = router;
