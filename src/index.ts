import express from 'express';
import { Pool } from 'pg';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors package

config();

const app = express();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Teams Controller
const getTeams = async (req: express.Request, res: express.Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM teams');
        res.json(rows);
    } catch (error) {
        console.error('Error getting teams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getTeamById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error getting team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createTeam = async (req: express.Request, res: express.Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    try {
        await pool.query('INSERT INTO teams (name) VALUES ($1)', [name]);
        res.status(201).json({ message: 'Team created successfully' });
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Players Controller
const getPlayers = async (req: express.Request, res: express.Response) => {
    try {
        const { rows } = await pool.query('SELECT * FROM players');
        res.json(rows);
    } catch (error) {
        console.error('Error getting players:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPlayerById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM players WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Player not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error getting player:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPlayersByTeamId = async (req: express.Request, res: express.Response) => {
    const { teamId } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM players WHERE teamId = $1', [teamId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'No players found for this team' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Error getting players by teamId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPlayerByTeamIdAndPlayerId = async (req: express.Request, res: express.Response) => {
    const { teamId, playerId } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM players WHERE teamId = $1 AND id = $2', [teamId, playerId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Player not found in this team' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error getting player by teamId and playerId:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createPlayer = async (req: express.Request, res: express.Response) => {
    const { name, age, role, teamId } = req.body;
    if (!name || !age || !role || !teamId) {
        return res.status(400).json({ error: 'Name, age, role, and teamId are required' });
    }
    try {
        await pool.query('INSERT INTO players (name, age, role, teamId) VALUES ($1, $2, $3, $4)', [name, age, role, teamId]);
        res.status(201).json({ message: 'Player created successfully' });
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Routes
app.get('/api/teams', getTeams);
app.get('/api/teams/:id', getTeamById);
app.post('/api/teams', createTeam);
app.get('/api/players', getPlayers);
app.get('/api/players/:id', getPlayerById);
app.get('/api/players/team/:teamId', getPlayersByTeamId);
app.get('/api/players/team/:teamId/player/:playerId', getPlayerByTeamIdAndPlayerId);
app.post('/api/players', createPlayer);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
