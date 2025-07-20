import { prisma } from '../services/prisma.js';

export const createHouse = async (data) => {
    const house = await prisma.house.create({
        data
    });

    return house;
}

export const getAll = async () => {
    const houses = await prisma.house.findMany({});

    return houses;
}

export const getById = async (id) => {
    const house = await prisma.house.findUnique({
        where: {
            id
        }
    });

    return house;
}

export const updateHouse = async (id, data) => {
    const house = await prisma.house.update({
        where: {
            id
        },
        data
    });

    return house;
}

export const deleteHouse = async (id) => {
    await prisma.house.delete({
        where: {
            id
        }
    });

    return;
}