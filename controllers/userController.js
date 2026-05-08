const {User} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistration= function(req,res){
    res.render('user/register');
}

module.exports.register = async function(req, res) {
    try {
        const existingUser = await User.findOne({
            where: { email: req.body.email }
        });

        if (existingUser) {
            return res.render('user/register', { error: 'User Already Exists' });
        }

        await User.create({
            email: req.body.email,
            password: md5(req.body.password),
            name: req.body.name,
        });

        res.redirect('/');
    } catch (err) {
        // This catches the '23502' or 'column id does not exist' errors
        console.error("Registration Error:", err);
        res.render('user/register', { error: 'A database error occurred. Please try again later.' });
    }
}

module.exports.renderLogin = function(req,res){
    let error = null
    if(req.session.messages && req.session.messages.length > 0){
        error = req.session.messages[0];
    }
    res.render('user/login', {error});
}

module.exports.authenticate = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports.renderEditForm = async function(req, res, next) {
    const user = await User.findByPk(
        req.user.id
    );
    res.render('edit', {user});
}

module.exports.updateUsername = async function(req, res) {
    try {
        await User.update(
            { name: req.body.name },
            { where: { id: req.params.id } }
        );
        res.redirect('/leaderboard');
    } catch (err) {
        console.error("Update Username Error:", err);
        res.status(500).send("Failed to update username.");
    }
}
