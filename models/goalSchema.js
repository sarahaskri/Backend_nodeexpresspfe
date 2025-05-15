const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  userId: {
   type: mongoose.Schema.Types.ObjectId,
  
   required: false
  },
  goal: {
    type: String,
    enum: ['gain weight', 'lose weight', 'build muscle'],
    required: false
  },
  targetWeight: {
    type: Number,
    required: false
  },
  currentWeight: {
    type: Number,
    required: false
  },
  initialWeight: { type: Number, required: false },
  imc: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Goal', goalSchema);