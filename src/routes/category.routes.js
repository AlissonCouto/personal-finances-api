import { getId, create } from '../controllers/category.controller.js';

const categoryRoutes = app => {
    app.post('/categories', create);
    app.get('/categories/:id', getId);
}

export default categoryRoutes;