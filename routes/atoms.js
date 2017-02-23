var express = require('express');
var router = express.Router();

router.get('/buttons', function(req, res, next) {
  res.render('atoms/buttons/view');
});

module.exports = router;
