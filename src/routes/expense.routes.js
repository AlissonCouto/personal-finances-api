import { create, get } from '../controllers/expense.controller.js';

const expenseRoutes = app => {
    app.post('/expenses', create);
    app.get('/expenses', get);
}

export default expenseRoutes;