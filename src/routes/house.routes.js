import { create, get, getId, update } from '../controllers/house.controller.js';

const houseRoutes = app => {
    app.post('/house', create);
    app.get('/house', get);
    app.get('/house/:id', getId);
    app.put('/house/:id', update);
}

export default houseRoutes;