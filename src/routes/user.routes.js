import { create, get, getId, update, remove } from '../controllers/user.controller.js';

const userRoutes = app => {
    app.post('/users', create);
    app.get('/users', get);
    app.get('/users/:id', getId);
    app.put('/users/:id', update);
    app.delete('/users/:id', remove)
}

export default userRoutes;