const express = require('express');
const router = express.Router();
const pool = require('../database/connection');

// Get user by email
router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;