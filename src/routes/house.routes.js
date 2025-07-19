import { create, get, getId } from '../controllers/house.controller.js';

const houseRoutes = app => {
    app.post('/house', create);
    app.get('/house', get);
    app.get('/house/:id', getId);
}

export default houseRoutes;