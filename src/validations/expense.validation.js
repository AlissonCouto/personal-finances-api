import Joi from 'joi';

export const expenseValidation = Joi.object({
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
    is_paid: Joi.boolean().required(),
    paid_amount: Joi.number()
        .precision(2)
        .positive()
        .when('is_paid', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),
    payment_date: Joi.date()
        .iso()
        .when('is_paid', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),

    discount: Joi.number()
        .precision(2)
        .positive()
        .when('is_paid', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),

    fees: Joi.number()
        .integer()
        .when('is_paid', {
            is: true,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),
    user_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
    house_id: Joi.number().integer()
}).custom((value, helpers) => {
    if (value.paid_amount > value.amount) {
        return helpers.message('"paid_amount" não pode ser maior que "amount"');
    }
    return value;
});