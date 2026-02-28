import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const controller = new CategoryController();

router.get('/', controller.list.bind(controller));
router.get('/:id', controller.getById.bind(controller));

export default router;
