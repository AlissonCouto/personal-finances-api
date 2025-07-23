import { createCategory, getAll, getById, updateCategory } from '../repositories/category.repository.js';
import { getById as userById } from '../repositories/user.repository.js';
import { verifyExistence } from '../utils/exists.js';
import { categoryValidation, categoryGetValidation, categoryUpdateValidation } from '../validations/category.validation.js';
import { prisma } from '../services/prisma.js';

export const create = async (req, res) => {
    try {
        const { error, value } = categoryValidation.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        // Verificando se o ID do usuário informado existe
        const userId = Number(value.user_id);
        const user = await verifyExistence(res, userById, userId, "Usuário não encontrado");
        if (!user) return;

        // Validando limite do campo percentual
        const aggregate = await prisma.category.aggregate({
            where: {
                user_id: userId
            },
            _sum: {
                percentage: true,
            }
        });

        const totalPercentage = parseFloat(aggregate._sum.percentage) ?? 0;

        if (totalPercentage + value.percentage > 100) {
            return res.status(422).send({
                success: false,
                message: "O cadastro desta categoria excede o limite máximo de 100%"
            });
        }

        const category = await createCategory(value);

        return res.status(201).send({
            success: true,
            message: "Categoria cadastrada com sucesso",
            data: category
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao cadastrar categoria",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const { error, value } = categoryGetValidation.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        const userId = Number(value.user_id);
        const user = await verifyExistence(res, userById, userId, "Usuário não encontrado");
        if (!user) return;

        const categories = await getAll(userId);

        return res.status(200).send({
            success: true,
            message: "Categorias retornadas com sucesso",
            data: categories
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro na listagem de categorias",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const categoryId = Number(req.params.id);
        const category = await verifyExistence(res, getById, categoryId, "Categoria não encontrada");
        if (!category) return;

        return res.status(200).send({
            success: true,
            message: "Categoria retornada com sucesso",
            data: category
        });
    } catch (err) {
        return res.status(500).send({
            success: true,
            message: "Erro ao consultar categoria",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {
        const { error, value } = categoryUpdateValidation.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        // Verificando se o ID do usuário informado existe
        const userId = Number(value.user_id);
        const user = await verifyExistence(res, userById, userId, "Usuário não encontrado");
        if (!user) return;

        // Verificando se a categoria informada existe
        const categoryId = Number(req.params.id);
        let categoryExist = await verifyExistence(res, getById, categoryId, "Categoria não encontrada");
        if (!categoryExist) return;

        // Validando limite do campo percentual
        const aggregate = await prisma.category.aggregate({
            where: {
                user_id: userId,
                id: {
                    not: categoryId
                }
            },
            _sum: {
                percentage: true,
            }
        });

        const totalPercentage = parseFloat(aggregate._sum.percentage) ?? 0;

        if (totalPercentage + value.percentage > 100) {
            return res.status(422).send({
                success: false,
                message: "O cadastro desta categoria excede o limite máximo de 100%"
            });
        }

        const category = await updateCategory(categoryId, value);

        return res.status(200).send({
            sucess: true,
            message: "Categoria atualizada com sucesso",
            data: category
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao atualizar categoria",
            data: err
        });
    }
}