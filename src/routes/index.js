import houseRoutes from './house.routes.js';
import userRoutes from './user.routes.js';

const routes = app => {
    houseRoutes(app);
    userRoutes(app);
}

export default routes;