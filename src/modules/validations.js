const Joi = require("joi");

module.exports = {
    async LoginValidation(data) {
        return await Joi.object({
            password: Joi.string().min(4).required(),
            username: Joi.string().min(5).max(20).required()
        }).validateAsync(data);
    },
    async SignUpValidation(data) {
        return await Joi.object({
            password: Joi.string().min(4).required(),
            username: Joi.string().min(5).max(20).required(),
            full_name: Joi.string().min(3).required()
        }).validateAsync(data);
    },

}