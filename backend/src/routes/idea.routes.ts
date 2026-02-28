import { Router } from 'express';
import multer from 'multer';
import { IdeaController } from '../controllers/idea.controller';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createIdeaSchema, updateIdeaSchema, ideaQuerySchema } from '../validators/idea.validator';

const router = Router();
const controller = new IdeaController();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});

router.get('/', validate(ideaQuerySchema, 'query'), controller.list.bind(controller));
router.get('/my', authenticate, controller.myIdeas.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.post(
  '/',
  authenticate,
  upload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'prototype', maxCount: 1 },
  ]),
  validate(createIdeaSchema),
  controller.create.bind(controller)
);
router.patch('/:id', authenticate, validate(updateIdeaSchema), controller.update.bind(controller));
router.delete('/:id', authenticate, controller.delete.bind(controller));

export default router;
