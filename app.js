const express = require('express');
var mongoose = require('mongoose');
var hbs = require('hbs');
var passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');


require('dotenv').config();
require('./config/passport')(passport);

const app = express();

//connect mongoose to express
const dbURI = process.env.DB_URI;
  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_Name,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then((res) => console.log('Database is connected'))
.catch((err) => console.log(err))

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}));

app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes

app.use('/', require('./routes/index'))
app.use('/login', require('./routes/login'))
app.use('/register', require('./routes/register'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))