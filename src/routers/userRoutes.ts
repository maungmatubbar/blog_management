import express from 'express';
import userController from '../controllers/UserController';
const router = express.Router();

router.get('/get-users', userController.getAllUsers);
router.post('/create', userController.createUser);

export default router;