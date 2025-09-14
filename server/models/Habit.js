import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly'], required: true },
  categories: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 },
  completions: [{ date: Date }]
});

export default mongoose.model('Habit', HabitSchema);
