import { create, get, getId, update, remove } from '../controllers/expense.controller.js';

const expenseRoutes = app => {
    app.post('/expenses', create);
    app.get('/expenses', get);
    app.get('/expenses/:id', getId);
    app.put('/expenses/:id', update);
    app.delete('/expenses/:id', remove);
}

export default expenseRoutes;