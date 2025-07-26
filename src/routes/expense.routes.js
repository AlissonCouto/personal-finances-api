import { create } from '../controllers/expense.controller.js';

const expenseRoutes = app => {
    app.post('/expenses', create);
}

export default expenseRoutes;