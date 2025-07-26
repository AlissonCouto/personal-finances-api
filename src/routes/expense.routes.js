import { create, get, getId, update } from '../controllers/expense.controller.js';

const expenseRoutes = app => {
    app.post('/expenses', create);
    app.get('/expenses', get);
    app.get('/expenses/:id', getId);
    app.put('/expenses/:id', update);
}

export default expenseRoutes;