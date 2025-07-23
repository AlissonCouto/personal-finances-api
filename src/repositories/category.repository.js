import { prisma } from '../services/prisma.js';

export const createCategory = async (data) => {
    const category = await prisma.category.create({
        data
    });

    return category;
}

export const getById = async (id) => {
    const category = await prisma.category.findUnique({
        where: { id }
    });

    return category;
}