import { create } from '../controllers/income.controller.js';

const incomeRoutes = app => {
    app.post('/incomes', create);
}

export default incomeRoutes;