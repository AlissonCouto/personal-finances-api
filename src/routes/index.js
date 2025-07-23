import houseRoutes from './house.routes.js';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';

const routes = app => {
    houseRoutes(app);
    userRoutes(app);
    categoryRoutes(app);
}

export default routes;