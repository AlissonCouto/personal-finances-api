import { create, get, getId } from '../controllers/expense.controller.js';

const expenseRoutes = app => {
    app.post('/expenses', create);
    app.get('/expenses', get);
    app.get('/expenses/:id', getId);
}

export default expenseRoutes;