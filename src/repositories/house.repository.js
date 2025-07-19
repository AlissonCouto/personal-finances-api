import { prisma } from '../services/prisma.js';

export const createHouse = async (data) => {
    const house = await prisma.house.create({
        data
    });

    return house;
}