import User from '../models/User.js';
import Habit from '../models/Habit.js';

export const searchUsers = async (req, res) => {
  try {
    const q = req.query.q || '';
    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ],
      _id: { $ne: req.user.id }
    }).select('_id username email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const followUser = async (req, res) => {
  try {
    if (req.user.id === req.params.id) return res.status(400).json({ message: 'Cannot follow yourself' });
    const user = await User.findById(req.user.id);
    if (user.friends.includes(req.params.id)) return res.status(400).json({ message: 'Already following' });
    user.friends.push(req.params.id);
    await user.save();
    res.json({ message: 'Followed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.friends = user.friends.filter(f => f.toString() !== req.params.id);
    await user.save();
    res.json({ message: 'Unfollowed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', '_id username email');
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFriendsFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friends = user.friends;
    const feed = await Habit.aggregate([
      { $match: { user: { $in: friends } } },
      { $unwind: '$completions' },
      { $sort: { 'completions.date': -1 } },
      { $limit: 20 },
      { $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userObj'
        }
      },
      { $unwind: '$userObj' },
      { $project: {
          _id: 0,
          user: { _id: '$userObj._id', username: '$userObj.username' },
          habit: { name: '$name' },
          date: '$completions.date',
          streak: '$streak'
        }
      }
    ]);
    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
