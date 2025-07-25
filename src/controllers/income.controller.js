import { createIncome, getAll, getById, updateIncome, deleteIncome } from '../repositories/income.repository.js';
import { getById as userById } from '../repositories/user.repository.js';
import { getById as categoryById } from '../repositories/category.repository.js';
import { getById as houseById } from '../repositories/house.repository.js';
import { incomeValidation, incomeUpdateValidation } from '../validations/income.validation.js';
import { verifyExistence } from '../utils/exists.js';

export const create = async (req, res) => {
    try {
        const { error, value } = incomeValidation.validate(req.body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        // Verificando existencia de usuário
        const userId = Number(value.user_id);
        const user = await verifyExistence(res, userById, userId, "Usuário não encontrado");
        if (!user) return;

        // Verificando existencia de categoria
        const categoryId = Number(value.category_id);
        const category = await verifyExistence(res, categoryById, categoryId, "Categoria não encontrada");
        if (!category) return;

        // Verificando existencia de casa se informada
        if (value.house_id) {
            const houseId = Number(value.house_id);
            const house = await verifyExistence(res, houseById, houseId, "Casa não encontrada");
            if (!house) return;
        }

        const income = await createIncome(value);

        return res.status(201).send({
            success: true,
            message: "Receita cadastrada com sucesso",
            data: income
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao cadastrar receita",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const incomes = await getAll();

        return res.status(200).send({
            success: true,
            message: "Receitas retornadas com sucesso",
            data: incomes
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao listar recetas",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const incomeId = Number(req.params.id);

        const income = await verifyExistence(res, getById, incomeId, "Receita não encontrada");
        if (!income) return;

        return res.status(200).send({
            success: true,
            message: "Receita retornada com sucesso",
            data: income
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao consultar receita",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {
        const incomeId = Number(req.params.id);
        const incomeExist = await verifyExistence(res, getById, incomeId, "Receita não encontrada");
        if (!incomeExist) return;

        const { error, value } = incomeUpdateValidation.validate(req.body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        // Verificando existencia de categoria
        const categoryId = Number(value.category_id);
        if (categoryId) {
            const category = await verifyExistence(res, categoryById, categoryId, "Categoria não encontrada");
            if (!category) return;
        }

        // Verificando existencia de casa se informada
        if (value.house_id) {
            const houseId = Number(value.house_id);
            const house = await verifyExistence(res, houseById, houseId, "Casa não encontrada");
            if (!house) return;
        }

        const income = await updateIncome(incomeId, value);

        return res.status(200).send({
            success: true,
            message: "Receita atualizada com sucesso",
            data: income
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao atualizar receita",
            data: err
        });
    }
}

export const remove = async (req, res) => {
    try {
        const incomeId = Number(req.params.id);
        const income = await verifyExistence(res, getById, incomeId, "Receita não encontrada");
        if (!income) return;

        await deleteIncome(incomeId);

        return res.status(200).send({
            success: true,
            message: "Receita deletada com sucesso",
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao deletar receita",
            data: err
        });
    }
}