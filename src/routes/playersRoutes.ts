import express from 'express';
import { PlayersController } from '../controllers/playersController';

const router = express.Router();

router.get('/', PlayersController.getPlayers);
router.get('/:id', PlayersController.getPlayerById);
router.get('/team/:teamId', PlayersController.getPlayersByTeamId);
router.get('/team/:teamId/player/:playerId', PlayersController.getPlayerByTeamIdAndPlayerId);
router.post('/', PlayersController.createPlayer);

export default router;
