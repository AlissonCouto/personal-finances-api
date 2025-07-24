import { create, get, getId, update } from '../controllers/income.controller.js';

const incomeRoutes = app => {
    app.post('/incomes', create);
    app.get('/incomes', get);
    app.get('/incomes/:id', getId);
    app.put('/incomes/:id', update);
}

export default incomeRoutes;