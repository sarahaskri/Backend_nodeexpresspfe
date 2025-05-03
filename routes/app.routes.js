const pushNotificationController = require('../controllers/push-notification.Controller');
const express = require('express');
const router = express.Router();

router.post('/sendNotification', pushNotificationController.sendNotification);

module.exports = router;
