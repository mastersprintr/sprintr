var express = require('express');
var router = express.Router();

// this is the login page of the sprintr.
//     1. will render the html page of the login page. 

router.get('/', function(req, res, next) {
    res.sendFile('views/index.html');
});

module.exports = router;

