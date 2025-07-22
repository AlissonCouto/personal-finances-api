import { create, get, getId, update } from '../controllers/user.controller.js';

const userRoutes = app => {
    app.post('/users', create);
    app.get('/users', get);
    app.get('/users/:id', getId);
    app.put('/users/:id', update);
}

export default userRoutes;