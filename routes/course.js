const express = require('express');
const router =  express.Router();
const Course = require('../models/courses')

router.get('/create', (req, res) => {
    res.render('create-course');
})

router.post('/create', (req, res) => {

    console.log('Incoming form', req.body);

    const newCourse =  new Course( {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.imageUrl,
    });

    newCourse.save()
    .then((result) => {
        console.log(result)
        res.redirect('/user-home')
    })
    .catch((err) => {
        res.send(err)
    })



})

router.get('/details/:id', (req, res) => {
    res.render('course-details');
})

router.get('/edit', (req, res) => {
    res.render('course-details');
})

module.exports = router;