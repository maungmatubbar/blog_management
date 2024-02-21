import express from 'express';
import userController from '../controllers/UserController';
import AuthMiddleware from '../middleware/AuthMiddleware';
const router = express.Router();

router.get('/get-users', userController.getAllUsers);
router.post('/register', userController.register);
router.post('/login',userController.userlogin);
router.get('/test',AuthMiddleware.requireSignIn,
 userController.testFunc);
export default router;