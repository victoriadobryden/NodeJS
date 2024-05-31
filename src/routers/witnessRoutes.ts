import { Router } from 'express';
import { createWitness, getWitnessBySpravaId, countWitnessBySpravaIds } from '../controllers/witnessController';

const router = Router();

router.post('/witness', createWitness);
router.get('/witness', getWitnessBySpravaId);
router.post('/witness/_counts', countWitnessBySpravaIds);

export default router;
