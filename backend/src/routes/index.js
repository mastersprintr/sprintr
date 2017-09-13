var express = require('express');
var router = express.Router();

// this is the login page of the sprintr.
//     1. will render the html page of the login page. 

// TODO: remove or fix this...
router.get('/', function(req, res, next) {
    res.sendFile('/app/src/views/index.html');
});

module.exports = router;

