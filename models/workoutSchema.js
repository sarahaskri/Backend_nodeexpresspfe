const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
 userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // Fait référence à l'ID du modèle User
            required: false
        },
  image: {
    type: String,
    required: false
  },
  nameOfExercise: {
    type: String,
    required: false
  },
  info: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  nameOfWorkout: {
    type: String,
    required: false
  },
  selectedDifficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: false
  },
  burnedCalories: {
    type: Number,
    required: false
  },
  role : { type: String, required: false },
  imagePath: String,
  date: { type: String, required: false },
  time: { type: String, required: false }
});



const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;