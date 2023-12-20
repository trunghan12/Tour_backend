import express from 'express'
import { createReview, 
    getAllComment, replyAdminComment, getAllLimitReviews
 } from './../controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()


//post comment
router.post('/:tourId', verifyUser, createReview)

router.get('/getAll', getAllLimitReviews)

//get all comment
router.get('/', getAllComment)

//admin reply comment 
router.put('/adminReply/:id', replyAdminComment)

export default router