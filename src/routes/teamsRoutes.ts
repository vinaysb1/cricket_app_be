import express from 'express';
import { TeamsController } from '../controllers/teamsController';

const router = express.Router();

router.get('/', TeamsController.getTeams);
router.get('/:id', TeamsController.getTeamById);
router.post('/', TeamsController.createTeam);

export default router;
