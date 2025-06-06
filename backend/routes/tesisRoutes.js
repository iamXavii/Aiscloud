const express = require('express');
const router = express.Router();
const Tesis = require('../models/tesis');

// Obtener todas las tesis
router.get('/', async (req, res) => {
  try {
    const tesis = await Tesis.find();
    res.json(tesis);
  } catch (error) {
    console.error('Error al obtener las tesis:', error);
    res.status(500).json({ message: 'Error al obtener las tesis' });
  }
});

module.exports = router;
