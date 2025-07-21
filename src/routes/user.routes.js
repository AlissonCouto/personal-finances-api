import { create } from '../controllers/user.controller.js';

const userRoutes = app => {
    app.post('/users', create);
}

export default userRoutes;