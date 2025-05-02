const admin = require('firebase-admin');
const serviceAccount = require('../functions/serviceAccountKey.json'); 


// Initialisation de l'app Firebase (uniquement une fois)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

exports.sendNotification = async (req, res) => {
    try {
        const message = {
            notification: {
                title: "test notification",
                body: "notification message"
            },
            data: {
                orderId: "13466",
                orderDate: "2023-10-10"
            },
            token: req.body.fcm_Token // Token du client
        };    

        const response = await admin.messaging().send(message);
        return res.status(200).send({ message: "Notification sent successfully", response });
    } catch (error) {
        return res.status(500).send({ message: "Error sending notification", error });
    }
};
