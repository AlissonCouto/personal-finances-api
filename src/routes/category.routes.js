import { getId, get, create, update, remove } from '../controllers/category.controller.js';

const categoryRoutes = app => {
    app.post('/categories', create);
    app.get('/categories', get);
    app.get('/categories/:id', getId);
    app.put('/categories/:id', update);
    app.delete('/categories/:id', remove);
}

export default categoryRoutes;