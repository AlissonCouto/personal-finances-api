import { create } from '../controllers/house.controller.js';

const houseRoutes = app => {
    app.post('/house', create);
}

export default houseRoutes;