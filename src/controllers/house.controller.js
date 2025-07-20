import { createHouse, getAll, getById, updateHouse, deleteHouse } from '../repositories/house.repository.js';
import { houseValidation } from '../validations/house.validation.js';

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

        res.status(201).send({
            success: true,
            message: "Casa cadastrada com sucesso",
            data: house
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao tentar cadastrar casa",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const houses = await getAll();

        res.status(200).send({
            success: true,
            message: "Casas retornadas com sucesso",
            data: houses
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro na listagem de casas",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const house = await getById(Number(req.params.id));

        res.status(200).send({
            success: true,
            message: "Casa retornada com sucesso",
            data: house
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao consultar casa",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {
        const house = await updateHouse(Number(req.params.id), req.body);

        res.status(200).send({
            success: true,
            message: "Casa alterada com sucesso",
            data: house
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao atualizar casa",
            data: err
        });
    }
}

export const remove = async (req, res) => {
    try {
        await deleteHouse(Number(req.params.id));

        res.status(200).send({
            success: true,
            message: "Casa deletada com sucesso",
            data: {}
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao deletar casa",
            data: err
        });
    }
}