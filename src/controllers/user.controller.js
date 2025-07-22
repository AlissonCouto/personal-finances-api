import { createUser, getAll } from '../repositories/user.repository.js';
import { userValidation } from '../validations/user.validation.js';
import { getById as houseById } from '../repositories/house.repository.js';
import bcrypt from 'bcrypt';

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
            return res.status(400).json({
                success: false,
                message: "Casa não encontrada",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passwordHash;

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