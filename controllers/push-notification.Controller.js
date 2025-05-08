const admin = require('firebase-admin');
const Workout = require('../models/workoutSchema'); // Importez le modèle Workout

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS in .env");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(process.env.GOOGLE_APPLICATION_CREDENTIALS))
  });
}

exports.sendNotification = async (req, res) => {
  try {
    const { userId, fcmToken } = req.body;

    // Vérification des paramètres
    if (!userId || !fcmToken) {
      return res.status(400).json({ message: "Paramètres manquants" });
    }

    // Date du jour au format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
  
    // Recherche des workouts
    const workouts = await Workout.find({
      userId: userId,
      date: today
    });

    if (workouts.length > 0) {
      const message = {
        notification: {
          title: " Training reminder ",
          body: `You have ${workouts.length} exercises planned for today !`
        },
        token: fcmToken
      };

      const response = await admin.messaging().send(message);
      return res.status(200).json({
        success: true,
        message: "Notification envoyée",
        workoutsCount: workouts.length,
        response
      });
    }

    return res.status(200).json({
      success: true,
      message: "Aucun exercice aujourd'hui",
      workoutsCount: 0
    });

  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message
    });
  }
}; 