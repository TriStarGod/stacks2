import express from 'express';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/add', auth, (req, res) => {
  // res.status(201).json({ user: req.userId }); // testing purposes ONLY
  res.status(201).json({ success: true });
});

export default router;
