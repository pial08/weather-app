var express = require('express');
var router = express.Router();

//login router
router.post('/', function(req, res, next) {

    var email = req.body.email;
    var password = req.body.pass;
    if(email == 'pial@gmail.com' && password == '1234') {
        console.log('email and pass ' + email + ' ' + password);
        res.render('index', {weather: null, error: null});
    }
    else {
        res.render('error/error', {error: "Email or password does not match"});
    }


});

module.exports = router;