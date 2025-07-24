import houseRoutes from './house.routes.js';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import incomeRoutes from './income.routes.js';

const routes = app => {
    houseRoutes(app);
    userRoutes(app);
    categoryRoutes(app);
    incomeRoutes(app);
}

export default routes;