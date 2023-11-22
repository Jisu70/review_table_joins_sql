// Dependencies
const express = require('express');
const router = express.Router();
// Controllers 
const {  saveData, getAllUser } = require('../controllers/userController')


// To get all the  reviews 
router.get('/get_user', getAllUser)

// To save the user
router.post('/save_user', saveData)


module.exports = router;