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
router.post('/addMeal', userController.addMeal);
router.post('/todayMeal', userController.todayMeal);
router.post('/addMealByAdmin',userController.addMealByAdmin);
router.put('/updateMealByAdmin/:id',userController.updateMealByAdmin);
router.delete('/deleteMealByAdmin/:id',userController.deleteMealByAdmin);
router.get('/getAllMealsByAdmin', userController.getAllMealsByAdmin);
router.get('/getMealsByType', userController.getMealsByType);

 

module.exports = router; 
  