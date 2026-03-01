import { Router } from 'express';
import { submit, getMyIdeas, getIdea } from '../controllers/idea.controller';
import { authenticate } from '../middleware/auth';
import { uploadIdeaFiles } from '../middleware/fileUpload';

const router = Router();

router.use(authenticate);

router.post('/', uploadIdeaFiles, submit);
router.get('/', getMyIdeas);
router.get('/:id', getIdea);

export default router;
