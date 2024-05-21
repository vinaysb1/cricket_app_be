import { Request, Response } from 'express';
import { TeamService } from '../services/teamService';

export class TeamsController {
    static async getTeams(req: Request, res: Response) {
        try {
            const teams = await TeamService.getTeams();
            res.json(teams);
        } catch (error) {
            console.error('Error getting teams:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getTeamById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const team = await TeamService.getTeamById(id);
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            console.error('Error getting team:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createTeam(req: Request, res: Response) {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        try {
            await TeamService.createTeam(name);
            res.status(201).json({ message: 'Team created successfully' });
        } catch (error) {
            console.error('Error creating team:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
