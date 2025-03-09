var express = require('express');
var router = express.Router();
const osController = require('../controllers/osController');

router.get('/getOsInformation', osController.getOsInformation); 
module.exports = router;
