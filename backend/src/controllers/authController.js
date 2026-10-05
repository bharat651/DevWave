const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {

  try {
    const { email, password, name } = req.body;
    console.log("this line get execute");
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, hashedPassword, name]
    );

    res.status(201).json({ user: result.rows[0], message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message } );
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    console.log(email);

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    // console.log(result.rows.length==0);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    // console.log(user)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }
    else{
      await pool.query(
          `UPDATE public.users
     SET last_active_date = CURRENT_DATE
     WHERE id = $1`,
          [user.id]
      );
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, name FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateDailyActivity = async (req, res) => {
  try {
    const result = await pool.query(
        `UPDATE public.users
             SET last_active_date = CURRENT_DATE
             WHERE id = $1
             RETURNING id, name, email, current_streak, last_active_date`,
        [req.user.userId]
    );

    res.status(200).json({
      message: "Daily activity updated",
      user: result.rows[0]
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update activity"
    });
  }
};

module.exports = { register, login, getProfile, updateDailyActivity };
