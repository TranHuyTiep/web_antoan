/**
 * Created by Huy Tiep on 3/30/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var helper = require('../../helper/helper')
var admin = require('../../model/admin/admin')

// app/routes.js

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/',helper.check_login, function(req, res) {
        var fullUrl = helper.fullUrl(req);
        res.render('admin/login/index',{fullUrl : fullUrl}); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login',helper.check_login, function(req, res) {
        var fullUrl = helper.fullUrl(req);
        // render the page and pass in any flash data if it exists
        res.render('admin/login/index', {flash:req.flash({ message: ('loginMessage')}),fullUrl : fullUrl });
    });

    // process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/admin/home', // redirect to the secure profile section
        failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)


    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/admin');
    });

// route middleware to make sure



module.exports = router;