import houseRoutes from './house.routes.js';
import userRoutes from './user.routes.js';
import categoryRoutes from './category.routes.js';
import incomeRoutes from './income.routes.js';
import expenseRoutes from './expense.routes.js';

const routes = app => {
    houseRoutes(app);
    userRoutes(app);
    categoryRoutes(app);
    incomeRoutes(app);
    expenseRoutes(app);
}

export default routes;