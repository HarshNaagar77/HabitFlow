import User from '../models/User.js';
import Habit from '../models/Habit.js';

export const getFriendProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('_id username email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const habits = await Habit.find({ user: user._id });
    res.json({ user, habits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
