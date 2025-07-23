import { prisma } from '../services/prisma.js';

export const getById = async (id) => {
    const category = await prisma.category.findUnique({
        where: { id }
    });

    return category;
}