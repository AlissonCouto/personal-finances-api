import { prisma } from '../services/prisma.js';

export const createUser = async (data) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,

            house: {
                connect: {
                    id: data.house_id
                }
            }
        },
    });

    delete user.password;

    return user;
}

export const getAll = async () => {
    const users = await prisma.user.findMany({});

    return users;
}

export const getById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    return user;
}

export const updateUser = async (id, data) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    });

    return user;
}

export const deleteUser = async (id) => {
    await prisma.user.delete({
        where: {
            id
        }
    });

    return;
}