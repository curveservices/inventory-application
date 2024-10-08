const express = require('express');
const { getAllGames } = require('../models/game');
const router = express.Router();


router.get('/', async (req, res) => {   
  const games = await getAllGames();
  res.render('/index', {
    title: "All Games",
    games
  });
})

module.exports = router;
