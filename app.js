var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { addUserAdherent, loginUser, addProfileInformation ,addMeal, todayMeal,addMealByAdmin,
  updateMealByAdmin, deleteMealByAdmin, getAllMealsByAdmin,getMealsByType,addExercise,
    getWorkoutsByType,deletedWorkout ,postfornotifications,calculate_goal,getGoalByUserId,
    addGoogleUser,login_with_google,getAdherentById,update,updatePassword
} = require('./controllers/userController'); // Importation du contrôleur

require("dotenv").config();
const{connectToMongoDb} = require("./config/db");

const http = require('http');

var indexRouter = require('./routes/indexRouter');
var usersRouter = require('./routes/usersRouter');
var osRouter = require('./routes/osRouter');
var app = express();
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:5003', 
  methods: ['GET', 'POST'],// Remplace par l'URL de ton app Flutter si nécessaire
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter); 
app.use('/api/users', usersRouter);
// Routes API for notifications
app.use("/apinot", require("./routes/app.routes"));

app.post('/api/users/register', addUserAdherent);
app.post('/api/users/login', loginUser);
app.put('/api/users/addProfileInformation', addProfileInformation);
// Assure-toi que cette route est bien définie
app.post('/api/users/GoogleSignIn', (req, res) => {
  // Traitement de la connexion Google ici
  res.send('Google Sign-In réussi');
});
app.post('/api/users/addMeal',addMeal);
app.post('/api/users/todayMeal', todayMeal);
app.post('/api/users/addMealByAdmin',addMealByAdmin);
app.put('/api/users/updateMealByAdmin/:id',updateMealByAdmin);
app.delete('/api/users/deleteMealByAdmin/:id',deleteMealByAdmin);
app.get('/api/users/getAllMealsByAdmin', getAllMealsByAdmin);
app.get('/api/users/getMealsByType', getMealsByType);
app.post('/api/users/addExercise', addExercise);
app.get('/api/users/getWorkoutsByType', getWorkoutsByType);
app.delete('/api/users/deletedWorkout/:id', deletedWorkout);
app.post('/api/users/postfornotifications', postfornotifications);
app.post('/api/users/calculate_goal', calculate_goal);
app.get('/api/users/getGoal', getGoalByUserId);
app.post('/api/users/addGoogleUser', addGoogleUser);
app.post('/api/users/login_with_google', login_with_google);
app.get('/api/users/getAdherentById/:id', getAdherentById);
app.put('/api/users/update/:id', update);
app.put('/api/users/updatePassword/:id', updatePassword);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); 
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 //res.render('error');
  res.status(500).json({ error: 'Internal Server Error' });

});
 
const server = http.createServer(app);
server.listen(process.env.port, () => {
  connectToMongoDb(),
   console.log('app is running on port 5003') });