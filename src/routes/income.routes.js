import { create, get } from '../controllers/income.controller.js';

const incomeRoutes = app => {
    app.post('/incomes', create);
    app.get('/incomes', get);
}

export default incomeRoutes;