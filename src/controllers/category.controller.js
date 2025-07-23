import { getById } from '../repositories/category.repository.js';
import { verifyExistence } from '../utils/exists.js';

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
        return res.status(400).send({
            success: true,
            message: "Erro ao consultar categoria",
            data: err
        });
    }
}