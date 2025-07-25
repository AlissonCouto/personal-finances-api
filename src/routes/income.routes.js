import { create, get, getId, update, remove } from '../controllers/income.controller.js';

const incomeRoutes = app => {
    app.post('/incomes', create);
    app.get('/incomes', get);
    app.get('/incomes/:id', getId);
    app.put('/incomes/:id', update);
    app.delete('/incomes/:id', remove);
}

export default incomeRoutes;