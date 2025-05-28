const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const tacoController = require('../controllers/tacoController');

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

/* GET home page */
router.get('/', addUserToViews, (req, res) => {
  res.render('index');
});

/* GET taco page with current score */
router.get('/taco', addUserToViews, redirectGuests, tacoController.showTacoPage);
router.get('/leaderboard', addUserToViews, redirectGuests, tacoController.showLeaderboard);

/* POST score increment when taco button pressed */
router.post('/score', addUserToViews, redirectGuests, tacoController.updateScore);
router.post('/upgrade', addUserToViews, redirectGuests, tacoController.buyUpgrade);
router.post('/bonus', addUserToViews, redirectGuests, tacoController.buyUpgrade2);

router.post('/save', addUserToViews, redirectGuests, tacoController.saveProgress);
router.post('/reset', addUserToViews, redirectGuests, tacoController.resetProgress);

router.get('/edit', addUserToViews, redirectGuests, userController.renderEditForm);
router.post('/edit', addUserToViews, redirectGuests, userController.updateUsername);

/* User auth routes */
router.get('/register', addUserToViews, userController.renderRegistration);
router.post('/register', addUserToViews, userController.register);
router.get('/login', addUserToViews, userController.renderLogin);
router.post('/login', addUserToViews, userController.authenticate);
router.get('/logout', addUserToViews, redirectGuests, userController.logout);

module.exports = router;
