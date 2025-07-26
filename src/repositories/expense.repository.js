import { prisma } from '../services/prisma.js';

export const createExpense = async (data) => {
    const expense = await prisma.expense.create({
        data: {
            description: data.description,
            due_date: data.due_date,
            amount: data.amount,
            payment_method: data.payment_method,
            is_paid: data.is_paid,
            paid_amount: data.paid_amount,
            payment_date: data.payment_date,
            discount: data.discount,
            fees: data.fees,

            user: {
                connect: {
                    id: data.user_id
                }
            },

            category: {
                connect: {
                    id: data.category_id
                }
            },

            // Se house_id existir, conecta
            ...(data.house_id && {
                house: {
                    connect: {
                        id: data.house_id
                    }
                }
            })
        }
    });

    return expense;
}

export const getAll = async () => {
    const expenses = await prisma.expense.findMany({});

    return expenses;
}

export const getById = async (id) => {
    const expense = await prisma.expense.findUnique({
        where: { id }
    });

    return expense;
}

export const updateExpense = async (id, data) => {
    const expense = await prisma.expense.update({
        where: { id },
        data: {
            description: data.description,
            due_date: data.due_date,
            amount: data.amount,
            payment_method: data.payment_method,
            is_paid: data.is_paid,
            paid_amount: data.paid_amount,
            payment_date: data.payment_date,
            discount: data.discount,
            fees: data.fees,

            ...(data.category_id) && {
                category: {
                    connect: { id: data.category_id }
                },
            },

            ...(data.house_id && {
                house: {
                    connect: { id: data.house_id }
                }
            })
        },
    });

    return expense;
};

export const deleteExpense = async (id) => {
    await prisma.expense.delete({
        where: { id }
    });

    return;
}