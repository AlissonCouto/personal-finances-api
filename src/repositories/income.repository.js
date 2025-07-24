import { prisma } from '../services/prisma.js';

export const createIncome = async (data) => {
    const income = await prisma.income.create({
        data: {
            description: data.description,
            due_date: data.due_date,
            amount: data.amount,
            payment_method: data.payment_method,

            user: {
                connect: { id: data.user_id }
            },

            category: {
                connect: { id: data.category_id }
            },

            // Se house_id existir, conecta
            ...(data.house_id && {
                house: {
                    connect: { id: data.house_id }
                }
            })
        },
    });

    return income;
}

export const getAll = async () => {
    const incomes = await prisma.income.findMany({});

    return incomes;
}

export const getById = async (id) => {
    const income = await prisma.income.findUnique({
        where: { id }
    });

    return income;
}

export const updateIncome = async (id, data) => {
    const income = await prisma.income.update({
        where: { id },
        data: {
            description: data.description,
            due_date: data.due_date,
            amount: data.amount,
            payment_method: data.payment_method,

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

    return income;
};
