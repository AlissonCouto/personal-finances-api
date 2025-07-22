import { createUser, getAll, getById, updateUser, deleteUser } from '../repositories/user.repository.js';
import { userValidation, userUpdateValidation } from '../validations/user.validation.js';
import { getById as houseById } from '../repositories/house.repository.js';
import { hashPassword } from '../utils/hashPassword.js';
import { verifyExistence } from '../utils/exists.js';

export const create = async (req, res) => {
    try {
        const { error, value } = userValidation.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        const house = await verifyExistence(res, houseById, req.body.house_id, "Casa não encontrada");
        if (!house) return;

        req.body.password = await hashPassword(req.body.password);

        const user = await createUser(req.body);

        return res.status(201).send({
            success: true,
            message: "Usuário cadastrado com sucesso",
            data: user
        });

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao tentar cadastrar usuário",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const users = await getAll();

        return res.status(200).send({
            success: true,
            message: "Usuários retornados com sucesso",
            data: users
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro na listagem de usuários",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const user = await verifyExistence(res, getById, userId, "Usuário não encontrado");
        if (!user) return;

        return res.status(200).send({
            success: true,
            message: "Usuário retornado com sucesso",
            data: user
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao consultar usuário",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {

        const userId = Number(req.params.id);

        const exist = await verifyExistence(res, getById, userId, "Usuário não encontrado");
        if (!exist) return;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nenhum dado enviado para atualização'
            });
        }

        const { error, value } = userUpdateValidation.validate(req.body);

        if (error) {
            return res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        if (req.body.house_id) {
            const house = await verifyExistence(res, houseById, req.body.house_id, "Casa não encontrada");
            if (!house) return;
        }

        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }

        const user = await updateUser(userId, req.body);

        return res.status(200).send({
            success: true,
            message: "Usuário alterado com sucesso",
            data: user
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao atualizar usuário",
            data: err
        });
    }
}

export const remove = async (req, res) => {
    try {
        const userId = Number(req.params.id);

        let user = await verifyExistence(res, getById, userId, "Usuário não encontrado");
        if (!user) return;

        await deleteUser(userId);

        return res.status(200).send({
            success: true,
            message: "Usuário deletado com sucesso"
        });
    } catch (err) {
        return res.status(400).send({
            success: false,
            message: "Erro ao deletar usuário",
            data: err
        });
    }
}