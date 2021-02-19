const express = require('express');
const router =  express.Router();
const { ensureAuthenticated } = require('../controllers/auth')
const Courses = require('../models/courses')


router.get('/', ensureAuthenticated, (req, res) => {
    Courses.find().then((course) => {
        console.log('Cubes are: ', course)
        res.render('user-home', { title: 'Cubicle', course: course });
      })
      .catch((err) => res.render(err));

})

module.exports = router;