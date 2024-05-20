-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create players table
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    role VARCHAR(255) NOT NULL,
    teamId INT,
    FOREIGN KEY (teamId) REFERENCES teams(id) ON DELETE CASCADE
);
