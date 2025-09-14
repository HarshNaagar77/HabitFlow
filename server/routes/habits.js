import express from 'express';
import { createHabit, getHabits, updateHabit, deleteHabit, checkInHabit } from '../controllers/habitController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, createHabit);
router.get('/', auth, getHabits);
router.put('/:id', auth, updateHabit);
router.delete('/:id', auth, deleteHabit);
router.post('/:id/checkin', auth, checkInHabit);

export default router;
