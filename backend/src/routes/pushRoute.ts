import { Router } from 'express';
import { pushHistory } from '../controllers/pushController';
import { authenticateToken } from '../middleware/authenticateToken';
import logger from '../utils/logger';

const router = Router();

/**
 * Route to handle pushing shell history.
 */
router.post('/push', authenticateToken, (req, res, next) => {
  logger.info('Received request to push shell history');
  pushHistory(req, res);
});

export default router;