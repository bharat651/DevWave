const pool = require('../config/db');

const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 ORDER BY updated_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const result = await pool.query(
      'SELECT * FROM progress WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Progress record not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const { completed_lessons, completion_percentage } = req.body;

    const result = await pool.query(
      'UPDATE progress SET completed_lessons = $1, completion_percentage = $2 WHERE user_id = $3 AND course_id = $4 RETURNING *',
      [completed_lessons, completion_percentage, userId, courseId]
    );

    if (result.rows.length === 0) {
      const insertResult = await pool.query(
        'INSERT INTO progress (user_id, course_id, completed_lessons, completion_percentage) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, courseId, completed_lessons, completion_percentage]
      );
      return res.status(201).json(insertResult.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const result = await pool.query(
      'DELETE FROM progress WHERE user_id = $1 AND course_id = $2 RETURNING *',
      [userId, courseId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Progress record not found' });
    }
    res.json({ message: 'Progress deleted', progress: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserProgress, getCourseProgress, updateProgress, deleteProgress };
