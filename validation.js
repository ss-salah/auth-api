const Joi = require('@hapi/joi');

// Register validation
const registerValidation = data =>{
const schema = {
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required()
};

return Joi.validate(data, schema);
};

// Register validation
const loginValidation = data =>{
    const schema = {
        username: Joi.string().min(5).required(),
        password: Joi.string().min(6).required()
    };
    
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;