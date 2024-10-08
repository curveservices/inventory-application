const pool = require('../config/db');

const getAllGames = async () => {
    return await pool.query('SELECT * FROM games');
};

const addGame = async (title, description, rating, image_url, release_date, publisher_id, category_id) => {
    return await pool.query(
        `INSERT INTO games (title, description, rating, image_url, release_date, publisher_id, category_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [title, description, rating, image_url, release_date, publisher_id, category_id]
    );
};

module.exports = {
    getAllGames,
    addGame,
};