import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile } from '../controllers/Admin.controller.js';
import authMiddleware from '../middlewares/Auth.middleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile/:id', authMiddleware, getAdminProfile);

export default router;