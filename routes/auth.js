const router = require("express").Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res)=>{

    // Validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in db
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send('User already exists');

    // Create a new user
    const user = new User({
         username: req.body.username,
         password: req.body.password
    });

    try {
        const savedUser = await user.save();
         res.send(savedUser);   
    } catch (err) {
         res.status(400).send(err);
    }
});

module.exports = router;