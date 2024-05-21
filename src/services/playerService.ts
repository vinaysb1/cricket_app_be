import { pool } from '../database/database';
import { Player } from '../models/playerModel';

export class PlayerService {
    static async getPlayers(): Promise<Player[]> {
        const { rows } = await pool.query('SELECT * FROM players');
        return rows;
    }

    static async getPlayerById(id: string): Promise<Player | null> {
        const { rows } = await pool.query('SELECT * FROM players WHERE id = $1', [id]);
        return rows[0] || null;
    }

    static async getPlayersByTeamId(teamId: string): Promise<Player[]> {
        const { rows } = await pool.query('SELECT * FROM players WHERE teamId = $1', [teamId]);
        return rows;
    }

    static async getPlayerByTeamIdAndPlayerId(teamId: string, playerId: string): Promise<Player | null> {
        const { rows } = await pool.query('SELECT * FROM players WHERE teamId = $1 AND id = $2', [teamId, playerId]);
        return rows[0] || null;
    }

    static async createPlayer(player: Player): Promise<void> {
        const { name, age, role, teamId } = player;
        await pool.query('INSERT INTO players (name, age, role, teamId) VALUES ($1, $2, $3, $4)', [name, age, role, teamId]);
    }
}
