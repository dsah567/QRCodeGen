import { Router } from 'express';
import { signup, login, getStaticQRCodes, getDynamicQRCodes } from '../controllers/user.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup',signup );
router.post('/login', login);
router.get('/static-qrcodes', authenticateUser, getStaticQRCodes);
// router.get('/static-qrcodes/:id', authenticateUser, getSpecificStaticQRCode);
router.get('/dynamic-qrcodes', authenticateUser, getDynamicQRCodes);
// router.get('/dynamic-qrcodes/:id', authenticateUser, getSpecificDynamicQRCode);

export default router;
