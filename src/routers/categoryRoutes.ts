import express from 'express';
import categoryController from '../controllers/CategoryController';
const router = express.Router();

router.get('/get-categories', categoryController.getAllCategory);
router.post('/create', categoryController.createCategory);
router.get('/get-category/:categoryId', categoryController.getCategory);
router.put('/update-category/:categoryId', categoryController.updateCategory);
router.delete('/delete-category/:categoryId', categoryController.deleteCategory);

export default router;