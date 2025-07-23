import Joi from 'joi';

export const categoryValidation = Joi.object({
    name: Joi.string().empty('').required(),
    percentage: Joi.number().positive().precision(2).min(1).max(100).required(),
    order: Joi.number().integer().min(0).default(0),
    user_id: Joi.number().integer().required()
});

export const categoryGetValidation = Joi.object({
    user_id: Joi.number().integer().required()
});

export const categoryUpdateValidation = Joi.object({
    name: Joi.string().empty(''),
    percentage: Joi.number().positive().precision(2).min(1).max(100),
    order: Joi.number().integer().min(0).default(0),
    user_id: Joi.number().integer().required()
});