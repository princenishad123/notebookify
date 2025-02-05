import express from 'express';
import { signupController, loginController, authCheck, getAllUsers } from "../controller/auth.controller.js"
import {getPostByLanguage, getTopicsByTopicName, sectionController, topicController} from "../controller/post.controller.js"
import protectedRoute from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/auth/signup',signupController)
router.get('/auth/check-auth',protectedRoute,authCheck)
router.post('/auth/login', loginController)
router.post('/language',protectedRoute,sectionController)
router.get('/admin/users',protectedRoute,getAllUsers)
router.post('/topic',protectedRoute, topicController)
router.get("/language/:language", getPostByLanguage)
router.get("/topics/:language/:topicName",getTopicsByTopicName)



export default router;