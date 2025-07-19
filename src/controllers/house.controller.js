import { createHouse } from '../repositories/house.repository.js';
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

        res.status(200).send({
            success: true,
            message: "Casa cadastrada com sucesso",
            data: house
        });
    } catch (err) {
        console.log('ERRO: ', err);
        res.status(400).send({
            success: false,
            message: "Erro ao tentar cadastrar casa",
            data: err
        });
    }
}