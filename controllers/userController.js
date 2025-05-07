const userSchema = require("../models/userSchema");
const Meal = require("../models/mealSchema");
const Workout = require("../models/workoutSchema");
const Goal = require("../models/goalSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

module.exports.addUserAdherent = async (req, res) => {
    try {
        const { firstname, lastname, email, password, age } = req.body;
        const role = "adherent";

        // Vérification du format du mot de passe
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
        }

        // Vérification si l'email existe déjà
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json("Cet email est déjà utilisé");
        }

        // Création de l'utilisateur (le hachage du mot de passe est déjà géré dans userSchema.js)
        const user = await userSchema.create({ firstname, lastname, email, password, role, age });

        // Retourne une réponse structurée
        res.status(201).json({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            _id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur serveur");
    }
};


module.exports.addUserAdmin = async (req, res) => {
    try {
        const { firstname, lastname, email, password, age } = req.body;
        const role = "admin";
        const user = await userSchema.create({ firstname, lastname, email, password, role: role, age });
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userSchema.findById(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const checkifExist = await userSchema.findById(id);
        if (!checkifExist) {
            res.status(404).json({ message: "user not found" });
        }
        const user = await userSchema.findByIdAndDelete(id);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addUserAdherentWithImg = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const role = "adherent";
        const { file_name } = req.file;
        const user = await userSchema.create({ firstname, lastname, email, password, role: role, user_image: file_name });
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.upDateAdherent = async (req, res) => {
    try {
        const id = req.params.id;
        res.status(200).json(esmFonction);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        // Vérifier si l'utilisateur existe
        const user = await userSchema.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        // Vérifier si l'email est modifié et déjà utilisé
        if (updates.email && updates.email !== user.email) {
            const existingUser = await userSchema.findOne({ email: updates.email });
            if (existingUser) {
                return res.status(400).json({ message: "Cet email est déjà utilisé" });
            }
        }

        //  Mise à jour des données
        const updatedUser = await userSchema.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        res.status(200).json({ message: "Utilisateur mis à jour avec succès", user: updatedUser });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.searchByUserName = async (req, res) => {
    try {
        const { firstname } = req.body;

        if (!firstname) {
            return res.status(400).json({ message: "firstname is required" });
        }

        const users = await userSchema.find({ firstname: { $regex: firstname, $options: 'i' } });

        if (users.length === 0) {
            return res.status(404).json({ message: "user not found" });
        }

        res.status(200).json({ count: users.length, users });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getAllUsersByAge = async (req, res) => {
    try {
        const users = await userSchema.find().sort({ age: 1 });
        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Recherche de l'utilisateur par son email
        console.log("Recherche de l'utilisateur avec l'email:", email); // Log pour débogage
        const user = await userSchema.findOne({ email });

        if (!user) {
            console.log("Utilisateur non trouvé pour l'email:", email); // Log pour débogage
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Comparaison du mot de passe hashé
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Mot de passe incorrect pour l'utilisateur:", email); // Log pour débogage
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Connexion réussie
        console.log("Connexion réussie pour l'utilisateur:", email); // Log pour débogage
        return res.status(200).json({
            message: "Connexion réussie",
            user: { email: user.email, firstname: user.firstname ,role :user.role, _id: user._id },
        });
    } catch (error) {
        console.error("Erreur serveur:", error); // Log pour débogage
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


module.exports.addProfileInformation = async (req, res) => {
    try {
        const { email, gender, age, weight, height } = req.body;

        const user = await userSchema.findOneAndUpdate(
            { email }, // Recherche l'utilisateur par email
            { $set: { gender, age, weight, height } }, // Met à jour les champs
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Informations mises à jour avec succès", user });

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

module.exports.handleGoogleSignIn = async (req, res) => {
    try {
        const { uid, email, firstName, lastName } = req.body;

        let user = await userSchema.findOne({ email });
        if (!user) {
            user = new userSchema({
                uid,
                email,
                firstname: firstName,
                lastname: lastName,
                password: "", // vide pour Google
            });
            await user.save();
        }

        res.status(200).json({ message: "Connexion Google réussie", user });
    } catch (error) {
        console.error("Erreur Google Sign-In :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};




module.exports.addMeal = async (req, res) => {
    const { userId, mealType, mealName, date, time ,imagePath,nutrition = {}} = req.body;
 console.log("Received mealnpm run dev data:", req.body); 
    if (!userId || !mealType || !mealName || !date || !time || !imagePath || !nutrition) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        // Vérifier si l'utilisateur existe
        const user = await userSchema.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
 ////nutrition
 const cleanedNutrition = {
    Calories: String(nutrition?.Calories || '0').replace(/[^\d]/g, ''),
    Fats: String(nutrition?.Fats || '0').replace(/[^\d]/g, ''),
    Proteins: String(nutrition?.Proteins || '0').replace(/[^\d]/g, ''),
    Carbs: String(nutrition?.Carbs || '0').replace(/[^\d]/g, '')
};
        // Créer un nouveau repas dans le modèle DailyMeal
        const newMeal = new Meal({
            userId,
            mealType,
            mealName,
            date,
            time,
            imagePath,
            nutrition: cleanedNutrition,
        });

        // Sauvegarder le repas dans la collection DailyMeals
        await newMeal.save();

        res.status(200).json({ message: 'Meal added successfully', meal: newMeal });
    } catch (error) {
        console.error('Add Meal Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports.todayMeal = async (req, res) => {
    try {
      const { userId, mealType } = req.body;
  
      if (!userId || !mealType) {
        return res.status(400).json({ message: "userId et mealType sont requis" });
      }
  
      // format d’aujourd’hui : YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
  
      // Récupérer tous les repas de cet utilisateur et type de repas
      const allMeals = await Meal.find({
        userId: userId,
        mealType: { $regex: mealType, $options: 'i' },
        imagePath: { $exists: true } 
      });
  
      // Filtrer les repas dont la date correspond à aujourd’hui
      const todayMeals = allMeals.filter(meal => {
        const mealDate = new Date(meal.date).toISOString().split('T')[0];
        return mealDate === today;
      });
  
      if (todayMeals.length === 0) {
        return res.status(404).json({ message: "Aucun repas trouvé pour aujourd'hui" });
      }
  
      res.status(200).json({ count: todayMeals.length, meals: todayMeals });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //////////////// for admin //////////////////////
  exports.addMealByAdmin = async (req, res) => {
    console.log('Reçu :', req.body);

    try {
      const meal = new Meal(req.body);
      await meal.save();
      res.status(201).json(meal);
    } catch (err) {
        console.error("Erreur lors de l'ajout :", err);
        res.status(400).json({ error: err.message });
      }
  };

  // 🔁 Update Meal
exports.updateMealByAdmin = async (req, res) => {
    console.log('Reçu :', req.body);
    try {
      const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(meal);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // ❌ Delete Meal
exports.deleteMealByAdmin = async (req, res) => {   
    try {
      await Meal.findByIdAndDelete(req.params.id);
      res.json({ message: 'Meal deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

  };

  // 📄 Get All Meals
exports.getAllMealsByAdmin = async (req, res) => {
    try {
      const meals = await Meal.find();
      res.json(meals);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  // userController.js
// Mauvais : utilisation de req.body pour une requête GET
exports.getMealsByType = async (req, res) => {
    try {
      // Correction : utiliser req.query pour les paramètres GET
      const { mealType } = req.query;
      
      // Validation du paramètre
      if (!mealType) {
        return res.status(400).json({ error: "Le paramètre mealType est requis" });
      }
  
      const meals = await Meal.find({ mealType, 
        role:'admin' 
       });
      res.json(meals);
      console.log("Repas récupérés avec succès :", meals); 
    } catch (err) {
      console.error("Erreur getMealsByType :", err);
      res.status(500).json({ error: "Erreur serveur lors de la récupération des repas" });
    }
  };

// Ajouter un nouvel exercice
 exports.addExercise = async (req, res) => {
  try {
    const {
      userId,
      image,
      nameOfExercise,
      info,
      description,
      nameOfWorkout,
      selectedDifficulty,
      burnedCalories,
      date,
      time,
    } = req.body;

    if (
      !userId || !image || !nameOfExercise || !info || !date || !time ||
      !description || !nameOfWorkout || !selectedDifficulty || 
      burnedCalories  === undefined
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newWorkout = new Workout({
      userId,
      image,
      nameOfExercise,
      info,
      description,
      nameOfWorkout,
      selectedDifficulty,
      burnedCalories,
      date,
      time,
    });

    await newWorkout.save();

    res.status(200).json({ message: 'Exercise added successfully', workout: newWorkout });
  } catch (error) {
    console.error('Error adding exercise:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getWorkoutsByType = async (req, res) => {
  const { userId, type } = req.params;

  try {
    const workouts = await Workout.find({ userId, nameOfWorkout:type });

    if (!workouts.length) {
      return res.status(404).json({ message: 'No workouts found for this user and type' });
    }

    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

 
exports.deletedWorkout= async (req, res) => {
  const { id } = req.params;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout non trouvé' });
    }

    res.status(200).json({ message: 'Workout supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.postfornotifications= async (req, res) => {
  const { userId, fcmToken } = req.body;
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  try {
    const workout = await Workout.findOne({ userId, date: today });

    if (workout) {
      const message = {
        notification: {
          title: "Entraînement du jour 💪",
          body: `Tu as "${workout.nameOfExercise}" aujourd'hui à ${workout.time}`
        },
        token: fcmToken,
      };

      await admin.messaging().send(message);
      return res.status(200).send('Notification envoyée');
    }

    res.status(200).send('Pas d’exercice aujourd’hui');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
};
///////////// GOAL CONTROLLER //


exports.calculate_goal = async (req, res) => {
  try {
    const { userId, goal } = req.body; 
   console.log("Received goal data:", req.body); 
    const user = await userSchema.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const weight = user.weight;
    const height = user.height / 100;
    const imc = weight / (height * height);

    let targetWeight;
    let message = '';

    if (goal === 'lose weight') {
      targetWeight = 24.9 * (height * height);
      const toLose = weight - targetWeight;
      message = `Pour un IMC normal (24.9), vous devez perdre environ ${toLose.toFixed(1)} kg.`;
    } else if (goal === 'gain weight') {
      targetWeight = 18.5 * (height * height);
      const toGain = targetWeight - weight;
      message = `Pour un IMC normal (18.5), vous devez prendre environ ${toGain.toFixed(1)} kg.`;
    } else if (goal === 'build muscle') {
      message = `Votre IMC est ${imc.toFixed(1)}. Concentrez-vous sur un excédent calorique contrôlé et l'entraînement.`;
    }

    // Enregistrer le goal AVANT de répondre
    const newGoal = new Goal({
      userId,
      goal,
      targetWeight,
      imc,
    });
 
    await newGoal.save();

    res.json({ imc: imc.toFixed(1), message, goal});

  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
// getGoalByUserId.js
exports.getGoalByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("Received userId:", userId); // Log pour débogage
  try {
    // Recherche de l'entrée de goal associée à l'userId
    const goalEntry = await Goal.findOne({ userId }); // ou Goal.findOne({ user: userId }) selon ton schema
    
    // Vérification si aucune donnée n'est trouvée pour ce userId
    if (!goalEntry) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    // Vérification si la clé goal existe dans l'entrée
    if (!goalEntry.goal) {
      return res.status(400).json({ message: 'Goal data is missing' });
    }

    // Retour des données de goal
    res.json({ goal: goalEntry.goal });
  } catch (error) {
    // Gestion des erreurs serveur
    console.error(error);  // Log pour aider au debug
    res.status(500).json({ message: 'Server error' ,error: error.message});
  }
};

