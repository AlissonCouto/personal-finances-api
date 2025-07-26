import { createExpense, getAll, getById, updateExpense, deleteExpense } from '../repositories/expense.repository.js';
import { getById as userById } from '../repositories/user.repository.js';
import { getById as categoryById } from '../repositories/category.repository.js';
import { getById as houseById } from '../repositories/house.repository.js';
import { expenseValidation, expenseUpdateValidation } from '../validations/expense.validation.js';
import { verifyExistence } from '../utils/exists.js';

export const create = async (req, res) => {
    try {
        const { error, value } = expenseValidation.validate(req.body);
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

        const expense = await createExpense(value);

        return res.status(201).send({
            success: true,
            message: "Despesa cadastrada com sucesso",
            data: expense
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao cadastrar despesa",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const expenses = await getAll();

        return res.status(200).send({
            success: true,
            message: "Despesas retornadas com sucesso",
            data: expenses
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao listar despesas",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const expenseId = Number(req.params.id);

        const expense = await verifyExistence(res, getById, expenseId, "Despesa não encontrada");
        if (!expense) return;

        return res.status(200).send({
            success: true,
            message: "Despesa retornada com sucesso",
            data: expense
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao consultar despesa",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {
        const expenseId = Number(req.params.id);
        const expenseExist = await verifyExistence(res, getById, expenseId, "Despesa não encontrada");
        if (!expenseExist) return;

        const { error, value } = expenseUpdateValidation.validate(req.body);
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

        const expense = await updateExpense(expenseId, value);

        return res.status(200).send({
            success: true,
            message: "Despesa atualizada com sucesso",
            data: expense
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao atualizar despesa",
            data: err
        });
    }
}

export const remove = async (req, res) => {
    try {
        const expenseId = Number(req.params.id);
        const expense = await verifyExistence(res, getById, expenseId, "Despesa não encontrada");
        if (!expense) return;

        await deleteExpense(expenseId);

        return res.status(200).send({
            success: true,
            message: "Despesa deletada com sucesso",
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Erro ao deletar despesa",
            data: err
        });
    }
}