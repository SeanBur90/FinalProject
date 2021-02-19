const express = require('express');
const router =  express.Router();
var User = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult} = require('express-validator');

router.get('/', (req, res) => {
    res.render('register');
})

router.post('/', (req, res, next) => {
    console.log('Register is working--', req.body);

  let name =req.body.username;
  let pass = req.body.password;
  let repeat = req.body.repeatPassword;

  let errors = [];

  if(!name || !pass) {
   errors.push({ msg: 'Please fill in all fields' })
    //alert('Please fill out all fields')
  }

  if((pass !== repeat)) {
      errors.push({ msg: 'Passwords do not match'} )
  }


  if( errors.length >= 1) {
    res.render('register', { 
        errors
     });

  } else {
    // let user = new User({name, pass});
    // user.save().then((request) => {
    //   console.log('this is the req', request)
    //   res.render('loginPage', { title: 'Login' });
    // })

    User.findOne({username : name})
      .then(user => {
        if(user) {
          errors.push({msg: 'Name is already registered'})
          res.render('register', { 
          errors
       });
        } else {
          const newUser = new User({
            username: name,
            password: pass,
          })

          bcrypt.genSalt(9, (err, salt) => { 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              //set password to hash
              newUser.password = hash;
              //save user
              newUser.save()
                .then(user => {
                  res.redirect('login')
                  console.log(newUser);
                })
                .catch(err => console.log(err))
            })
          })

        }        
      })
  }
 
    
})

module.exports = router;