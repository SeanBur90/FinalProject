const express = require('express');
const router =  express.Router();
const passport = require('passport');
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
  
    console.log('Login test')
    passport.authenticate('local', {
      successRedirect: '/user-home',
      failureRedirect: '/login',
      failureFlash: true,
  
    })(req, res)

    

    // try {
    //   console.log(req.body);
    //   const { username, password } = req.body;
    //   const user = await User.findByCredentials(username, password);
    //   const token = await user.generateAuthToken();
  
    //   // set token as a cookie
    //   res.cookie("token", token, { httpOnly: true, maxAge: 10000 * 10000 });
    //   res.cookie("loggedIn", true);
  
    //   //res.send({ user, token });
    //   res.redirect("/");
    // } catch (error) {
    //   console.log("It didn't work! ");
    //   res.render("login", {
    //     errors: "Login failed! Check authentication credentials",
    //   });
    // }
  
  
  })

module.exports = router;