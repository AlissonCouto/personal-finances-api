import { createHouse, getAll, getById, updateHouse, deleteHouse } from '../repositories/house.repository.js';
import { houseValidation } from '../validations/house.validation.js';
import { verifyExistence } from '../utils/exists.js';

export const create = async (req, res) => {
    try {

        const { error, value } = houseValidation.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        const house = await createHouse(req.body);

        return res.status(201).send({
            success: true,
            message: "Casa cadastrada com sucesso",
            data: house
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao tentar cadastrar casa",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const houses = await getAll();

        return res.status(200).send({
            success: true,
            message: "Casas retornadas com sucesso",
            data: houses
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro na listagem de casas",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {

        const houseId = Number(req.params.id);
        const house = await verifyExistence(res, getById, houseId, "Casa não encontrada");
        if (!house) return;

        return res.status(200).send({
            success: true,
            message: "Casa retornada com sucesso",
            data: house
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao consultar casa",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {
        const houseId = Number(req.params.id);
        const houseExist = await verifyExistence(res, getById, houseId, "Casa não encontrada");
        if (!houseExist) return;

        const { error, value } = houseValidation.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        const house = await updateHouse(houseId, req.body);

        return res.status(200).send({
            success: true,
            message: "Casa alterada com sucesso",
            data: house
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao atualizar casa",
            data: err
        });
    }
}

export const remove = async (req, res) => {
    try {
        const houseId = Number(req.params.id);

        const houseExist = await verifyExistence(res, getById, houseId, "Casa não encontrada");
        if (!houseExist) return;

        if (!house) {
            return res.status(404).send({
                success: false,
                message: "Casa não encontrada"
            });
        }

        await deleteHouse(houseId);

        return res.status(200).send({
            success: true,
            message: "Casa deletada com sucesso"
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao deletar casa",
            data: err
        });
    }
}