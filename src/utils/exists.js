export const verifyExistence = async (res, getFunction, id, message = 'Informação não encontrada') => {
    const entity = await getFunction(id);
    if (!entity) {
        res.status(404).send({
            success: false,
            message: message
        });
        return false;
    }
    return entity;
};