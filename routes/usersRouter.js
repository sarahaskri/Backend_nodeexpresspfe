var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');

router.post('/addUserAdherent', userController.addUserAdherent); 
router.post('/addUserAdmin', userController.addUserAdmin); 
router.get('/getAllUsers', userController.getAllUsers); 
router.get('/getUserById/:id', userController.getUserById); 
router.delete('/deleteUserById/:id', userController.deleteUserById);
router.post('/addUserAdherentWithImg', upload.single('user_image'), userController.addUserAdherentWithImg);
router.put('/updateUserById/:id', userController.updateUserById); 
router.get('/searchByUserName', userController.searchByUserName); 
router.get('/getAllUsersByAge', userController.getAllUsersByAge); 
router.post('/loginUser', userController.loginUser);
router.put('/addProfileInformation', userController.addProfileInformation);
router.post('/handleGoogleSignIn', userController.handleGoogleSignIn);
module.exports = router; 
  