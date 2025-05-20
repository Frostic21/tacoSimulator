var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')


function addUserToViews(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
}

function redirectGuests(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
}
/* GET home page. */
router.get('/', addUserToViews, function(req, res, next) {
  res.render('index');
});
router.get('/taco', addUserToViews, function(req, res, next) {
  res.render('taco/taco')
})
router.get('/register', addUserToViews, userController.renderRegistration);
router.post('/register', addUserToViews, userController.register);

router.get('/login', addUserToViews, userController.renderLogin);
router.post('/login', addUserToViews, userController.authenticate);

router.get('/logout', addUserToViews, userController.logout);

module.exports = router;
