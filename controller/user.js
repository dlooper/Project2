var express = require('express'); 
var router = express.Router(); 
var db   = require('../models/db');

/* Example 2 - Create User */
router.get('/create', function(req, res){
    res.render('simpleform.ejs', {action: '/user/create'});
});

router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) throw err;

            if(result.UserID != 'undefined') {
                var placeHolderValues = {
                    email: req.body.email,
                    password: req.body.password
                };
                res.render('displayUserInfo.ejs', placeHolderValues);
            }
            else {
                res.send('User was not inserted.');
            }
        }
    );
});

/* Example 3 - View all users */
router.get('/all', function (req, res) {

db.GetAll(function (err, result) { 
 if (err) throw err; 
 res.render('displayUserTable.ejs', {rs: result});

        }
    );
});

/* View a single user */
router.get('/', function (req, res) {

    db.GetOne(req.query.userid, function (err, result) {
            if (err) throw err;
            if(typeof result != 'undefined' && result.length > 0) {
                //NOTE: We are using the same template here as for the view of all users
                res.render('displayUserTable', {rs: result});
            }
            else {
                res.send('No users exist.');
            }
        }
    );
});

// Return Password by inputting Email
router.get('/get', function (req, res){
    res.render('getuser.ejs', {action: '/user/get'});
});

router.post('/get', function (req, res) {
    
    db.GetInfo(req.body.email, function (err, result) {
        if (err) throw err; 
                    
                    if(result.UserID != 'undefined') {
                    console.log(result);
                      var placeHolderValues = {
                          email: req.body.email,
                          password: result[0].Password
                      };
                      res.render('displayInfoFromPass.ejs', placeHolderValues);
                    }
                    else
                      res.send('User does not exist.');
                });

    });

// Get NewsFeed (Join of two tables - User and Twoot)
router.get('/feed', function (req, res) {
    db.NewsFeed(function (err, result) {
        if (err) throw err;
        res.render('newsFeed.ejs', {rs: result});
    });
});

// Change Email
router.get('/change', function (req, res) {
    res.render('changeEmail.ejs', {action: '/user/get'});
});

router.post('/change', function (req, res) {
     db.ChangeEmail(req.body.name, req.body.email, function (err, result) {
        if (err) throw err;

                    if(result.UserID != 'undefined') {
                    //console.log(result);
                      var placeHolderValues = {
                          name: req.body.name,
                          email: req.body.email
                      };
                      res.render('returnChanges.ejs', placeHolderValues);
                    }
                    else
                      res.send('User does not exist.');
                });

    });

module.exports = router; 
