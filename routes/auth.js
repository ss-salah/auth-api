const router = require("express").Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require("bcryptjs");

router.post('/register', async (req, res)=>{

    // Validate data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if user is already in db
    const usernameExist = await User.findOne({username: req.body.username});
    if(usernameExist) return res.status(400).send('User already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(req.body.password, salt);


    // Create a new user
    const user = new User({
         username: req.body.username,
         password: hashedPasswd
    });

    try {
        const savedUser = await user.save();
         res.send({user: user._id});   
    } catch (err) {
         res.status(400).send(err);
    }
});

module.exports = router;