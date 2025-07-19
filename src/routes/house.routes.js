import { create, get } from '../controllers/house.controller.js';

const houseRoutes = app => {
    app.post('/house', create);
    app.get('/house', get);
}

export default houseRoutes;