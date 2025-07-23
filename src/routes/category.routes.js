import { getId } from '../controllers/category.controller.js';

const categoryRoutes = app => {
    app.get('/categories/:id', getId);
}

export default categoryRoutes;