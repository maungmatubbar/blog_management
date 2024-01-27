import express from 'express';
import categoryController from '../controllers/CategoryController';
const router = express.Router();

router.get('/get-cateories', categoryController.getAllCategory);
router.post('/create', categoryController.createCategory);

export default router;