import { createIncome } from '../repositories/income.repository.js';
import { getById as userById } from '../repositories/user.repository.js';
import { getById as categoryById } from '../repositories/category.repository.js';
import { getById as houseById } from '../repositories/house.repository.js';
import { incomeValidation } from '../validations/income.validation.js';
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