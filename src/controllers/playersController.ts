import { Request, Response } from 'express';
import { PlayerService } from '../services/playerService';

export class PlayersController {
    static async getPlayers(req: Request, res: Response) {
        try {
            const players = await PlayerService.getPlayers();
            res.json(players);
        } catch (error) {
            console.error('Error getting players:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getPlayerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const player = await PlayerService.getPlayerById(id);
            if (!player) {
                return res.status(404).json({ error: 'Player not found' });
            }
            res.json(player);
        } catch (error) {
            console.error('Error getting player:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getPlayersByTeamId(req: Request, res: Response) {
        const { teamId } = req.params;
        try {
            const players = await PlayerService.getPlayersByTeamId(teamId);
            if (players.length === 0) {
                return res.status(404).json({ error: 'No players found for this team' });
            }
            res.json(players);
        } catch (error) {
            console.error('Error getting players by teamId:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getPlayerByTeamIdAndPlayerId(req: Request, res: Response) {
        const { teamId, playerId } = req.params;
        try {
            const player = await PlayerService.getPlayerByTeamIdAndPlayerId(teamId, playerId);
            if (!player) {
                return res.status(404).json({ error: 'Player not found in this team' });
            }
            res.json(player);
        } catch (error) {
            console.error('Error getting player by teamId and playerId:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createPlayer(req: Request, res: Response) {
        const { name, age, role, teamId } = req.body;
        if (!name || !age || !role || !teamId) {
            return res.status(400).json({ error: 'Name, age, role, and teamId are required' });
        }
        try {
            await PlayerService.createPlayer({ name, age, role, teamId });
            res.status(201).json({ message: 'Player created successfully' });
        } catch (error) {
            console.error('Error creating player:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
