const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Fait référence à l'ID du modèle User
        required: false
    },
    mealType: { type: String, required: false },
    mealName: { type: String, required: false },
   description: String,
    nutrition: {
        Calories: String,
        Fats: String,
        Proteins: String,
        Carbs: String
    },
    role : { type: String, required: false },
    imagePath: String,
    date: { type: String, required: false },
    time: { type: String, required: false }
});

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;

