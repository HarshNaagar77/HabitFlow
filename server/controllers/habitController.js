import Habit from '../models/Habit.js';

export const createHabit = async (req, res) => {
  try {
    const { name, frequency, categories } = req.body;
    const exists = await Habit.findOne({ user: req.user.id, name });
    if (exists) return res.status(400).json({ message: 'Habit already exists' });
    const habit = new Habit({ user: req.user.id, name, frequency, categories });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.category) {
      update.categories = Array.isArray(update.category) ? update.category : [update.category];
      delete update.category;
    }
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      update,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const checkInHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.user.id });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    const today = new Date();
    const alreadyChecked = habit.completions.some(c => {
      const d = new Date(c.date);
      return d.toDateString() === today.toDateString();
    });
    if (alreadyChecked) return res.status(400).json({ message: 'Already checked in today' });
    habit.completions.push({ date: today });
    habit.streak += 1;
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
