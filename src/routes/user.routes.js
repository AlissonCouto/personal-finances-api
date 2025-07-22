import { create, get, getId } from '../controllers/user.controller.js';

const userRoutes = app => {
    app.post('/users', create);
    app.get('/users', get);
    app.get('/users/:id', getId);
}

export default userRoutes;