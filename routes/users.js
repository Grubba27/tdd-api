var express = require('express');
const {User} = require("../app");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/user', async function (req, res, next) {
  const userReq = req.body;
  if (userReq.email && userReq.name && userReq.password ) {
    try{
      const user = await User.findOne({"email": req.body.email});
      if (user !== undefined) {
        res.sendStatus(400);
        res.json({errorMessage: `${req.body.email} already is in use`, error: req.body.email})
      }
      const newUser = new User( {name: req.body.name, email: req.body.email, password: req.body.password });
      await newUser.save();
      res.json(newUser);
    }catch (err) {
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(400);

  }


});

module.exports = router;
