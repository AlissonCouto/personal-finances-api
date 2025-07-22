import { create, get } from '../controllers/user.controller.js';

const userRoutes = app => {
    app.post('/users', create);
    app.get('/users', get);
}

export default userRoutes;