const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Fait référence à l'ID du modèle User
        required: true
    },
    mealType: { type: String, required: false },
    mealName: { type: String, required: false },
    date: { type: String, required: false },
    time: { type: String, required: false }
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;

