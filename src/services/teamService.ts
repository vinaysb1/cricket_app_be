import { pool } from '../database/database';
import { Team } from '../models/teamModel';

export class TeamService {
    static async getTeams(): Promise<Team[]> {
        const { rows } = await pool.query('SELECT * FROM teams');
        return rows;
    }

    static async getTeamById(id: string): Promise<Team | null> {
        const { rows } = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);
        return rows[0] || null;
    }

    static async createTeam(name: string): Promise<void> {
        await pool.query('INSERT INTO teams (name) VALUES ($1)', [name]);
    }
}
