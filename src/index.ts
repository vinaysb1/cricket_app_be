import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import teamRoutes from './routes/teamsRoutes';
import playerRoutes from './routes/playersRoutes';

config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
