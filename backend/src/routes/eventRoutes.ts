import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController';

const router = express.Router();

router.post('/', createEvent); // Endpoint untuk Create
router.get('/', getEvents);    // Endpoint untuk Read (list data)

export default router;