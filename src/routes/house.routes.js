import { create, get, getId, update, remove } from '../controllers/house.controller.js';

const houseRoutes = app => {
    app.post('/houses', create);
    app.get('/houses', get);
    app.get('/houses/:id', getId);
    app.put('/houses/:id', update);
    app.delete('/houses/:id', remove);
}

export default houseRoutes;