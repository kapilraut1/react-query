import express from 'express';
import { loginUser, getUsers } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/login", loginUser);
router.get('/', authMiddleware, getUsers)

export default router;
