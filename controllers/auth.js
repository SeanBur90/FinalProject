const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect('/');
      },
      forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
          return next();
        }
        res.redirect('/auth');      
      }
}

module.exports = auth