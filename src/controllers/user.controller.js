import { createUser, getAll, getById, updateUser, deleteUser } from '../repositories/user.repository.js';
import { userValidation, userUpdateValidation } from '../validations/user.validation.js';
import { getById as houseById } from '../repositories/house.repository.js';
import { hashPassword } from '../utils/hashPassword.js';

export const create = async (req, res) => {
    try {
        const { error, value } = userValidation.validate(req.body);

        if (error) {
            res.status(400).send({
                success: false,
                message: "Erro de validação",
                data: error.details
            });
        }

        const house = await houseById(req.body.house_id);

        if (!house) {
            return res.status(404).json({
                success: false,
                message: "Casa não encontrada",
            });
        }

        req.body.password = await hashPassword(req.body.password);

        const user = await createUser(req.body);

        res.status(201).send({
            success: true,
            message: "Usuário cadastrado com sucesso",
            data: user
        });

    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao tentar cadastrar usuário",
            data: err
        });
    }
}

export const get = async (req, res) => {
    try {
        const users = await getAll();

        res.status(200).send({
            success: true,
            message: "Usuários retornados com sucesso",
            data: users
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro na listagem de usuários",
            data: err
        });
    }
}

export const getId = async (req, res) => {
    try {
        const user = await getById(Number(req.params.id));

        res.status(200).send({
            success: true,
            message: "Usuário retornado com sucesso",
            data: user
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: "Erro ao consultar usuário",
            data: err
        });
    }
}

export const update = async (req, res) => {
    try {

        const userExist = await getById(Number(req.params.id));

        if (!userExist) {
            return res.status(404).send({
                success: false,
                message: "Usuário não encontrado",
            });
        }

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
            const house = await houseById(req.body.house_id);

            if (!house) {
                return res.status(400).json({
                    success: false,
                    message: "Casa não encontrada",
                });
            }
        }

        if (req.body.password) {
            req.body.password = await hashPassword(req.body.password);
        }

        const user = await updateUser(Number(req.params.id), req.body);

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
        const user = await getById(userId);

        if (!user) {
            return res.status(404).send({
                success: true,
                message: "Usuário não encontrado"
            });
        }

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