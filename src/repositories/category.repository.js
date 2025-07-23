import { prisma } from '../services/prisma.js';

export const createCategory = async (data) => {
    const category = await prisma.category.create({
        data
    });

    return category;
}

export const getAll = async (user_id) => {
    const categories = await prisma.category.findMany({
        where: {
            user_id: user_id
        }
    });

    return categories;
}

export const getById = async (id) => {
    const category = await prisma.category.findUnique({
        where: { id }
    });

    return category;
}

export const updateCategory = async (id, data) => {
    const category = await prisma.category.update({
        where: { id },
        data
    });

    return category;
}