import { create, get, getId } from '../controllers/income.controller.js';

const incomeRoutes = app => {
    app.post('/incomes', create);
    app.get('/incomes', get);
    app.get('/incomes/:id', getId);
}

export default incomeRoutes;