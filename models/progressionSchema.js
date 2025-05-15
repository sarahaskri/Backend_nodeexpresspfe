const mongoose = require('mongoose');

const progressionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  targetWeight: { 
    type: Number,
    required: false
  },
  initialWeight: {  
    type: Number,
    required: false
  },
  currentWeight: {  
    type: Number,
    required: false
  },
  weightDifference: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},);
module.exports = mongoose.model('Progression', progressionSchema);