import Joi from 'joi';

export const houseValidation = Joi.object({
    name: Joi.string().max(255).required(),
});
