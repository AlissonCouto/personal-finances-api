import Joi from 'joi';

export const userValidation = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).required(),
    house_id: Joi.number().integer().required()
});

export const userUpdateValidation = Joi.object({
    name: Joi.string().max(255).empty(''),
    email: Joi.string().max(255).email().empty(''),
    password: Joi.string().min(6).empty(''),
    house_id: Joi.number().integer()
});