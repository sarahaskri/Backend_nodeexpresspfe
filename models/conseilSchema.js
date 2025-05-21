const mongoose = require('mongoose');

const conseilSchema = new mongoose.Schema({
  goal: {
    type: String,
    enum: ['lose weight', 'gain weight', 'build muscle'],
    required: false
  },
  advice: {
    type: [String], 
    required: false
  }
});

module.exports = mongoose.model('Conseil', conseilSchema);