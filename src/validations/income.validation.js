import Joi from 'joi';

export const incomeValidation = Joi.object({
    description: Joi.string().empty('').required(),
    due_date: Joi.date().iso().required(),
    amount: Joi.number().precision(2).positive().required(),
    payment_method: Joi.string().valid(
        'BankSlip',
        'CreditCard',
        'DebitCard',
        'Check',
        'Cash',
        'BankPayment',
        'Courtesy',
        'Voucher',
        'Agreement'
    ).required(),
    user_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
    house_id: Joi.number().integer()
});