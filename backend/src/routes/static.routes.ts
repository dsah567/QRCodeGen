import { Router } from 'express';
import { generateStaticQRCode, getSpecificStaticQRCode } from '../controllers/static.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/generate', authenticate, generateStaticQRCode);
router.get('/:id', authenticate, getSpecificStaticQRCode);

export default router;
 