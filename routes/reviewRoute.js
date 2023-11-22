// Dependencies
const express = require('express') ;
const router = express.Router() ;
// Controllers 
const { getReview, getReviewById  } = require('../controllers/reviewController')


// To get all the  reviews 
router.get('/get-review', getReview)

// To get reviews for Specific company 
router.get("/get-review/:id", getReviewById);


module.exports = router ;