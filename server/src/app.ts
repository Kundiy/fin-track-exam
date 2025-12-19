import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {authenticateJWT} from './middleware/auth';
import listEndpoints from 'express-list-endpoints';
import {Response, Request} from "express";

import openRoutesV1 from './routes/v1/open';
import closeRoutesV1 from './routes/v1/close';
import {dbClient, dbConnect} from "./db";
import {API_CLOSE_PATH_PREFIX, API_OPEN_PATH_PREFIX, API_V1} from "./routes/v1/api-paths";
import {login, register} from "./controllers/auth-controller";
import {
    appendSimpleCategory, deleteCategoryById,
    getCategoriesByCategoryType,
    getCategoryById,
    getCategoryTypes, selectBalanceByUserId, selectTransactionsByUserId, updateCategoryById
} from "./controllers/categories-controller";

const app = express();
const openRouter = express.Router();
const closeRouter = express.Router();
const PORT = process.env.PORT || 8080;

// Security & Standard Middleware
app.use(helmet()); // Secure HTTP headers
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[Incoming] ${req.method} ${req.url}`);
    next();
});

app.use(API_OPEN_PATH_PREFIX, openRouter);
openRouter.use(API_OPEN_PATH_PREFIX, openRoutesV1);

app.use(API_CLOSE_PATH_PREFIX, closeRouter);
closeRouter.use(API_CLOSE_PATH_PREFIX, authenticateJWT, closeRoutesV1);


openRouter.post(API_V1.OPEN.POST.REGISTER, (request, response) => {
    return register(request, response);
});

openRouter.post(API_V1.OPEN.POST.LOGIN, (request, response) => {
    return login(request, response);
});

closeRouter.get(API_V1.CLOSE.GET.CATEGORY_TYPES, authenticateJWT, (_: Request, response: Response) => {
    return getCategoryTypes(response);
});

closeRouter.post(API_V1.CLOSE.POST.CATEGORIES, authenticateJWT, (request: Request, response: Response) => {
    return appendSimpleCategory(request, response);
});

closeRouter.get(API_V1.CLOSE.GET.CATEGORIES, authenticateJWT, (request: Request, response: Response) => {
    return getCategoriesByCategoryType(request, response);
});

closeRouter.get(`${API_V1.CLOSE.GET.CATEGORIES}/:id`, authenticateJWT, (request: Request, response: Response) => {
    return getCategoryById(request, response);
});

closeRouter.put(`${API_V1.CLOSE.PUT.CATEGORIES}/:id`, authenticateJWT, (request: Request, response: Response) => {
    return updateCategoryById(request, response);
});

closeRouter.delete(`${API_V1.CLOSE.DELETE.CATEGORIES}/:id`, authenticateJWT, (request: Request, response: Response) => {
    return deleteCategoryById(request, response);
});

closeRouter.get(`${API_V1.CLOSE.GET.TRANSACTIONS}`, authenticateJWT, (request: Request, response: Response) => {
    return selectTransactionsByUserId(request, response);
});

closeRouter.get(`${API_V1.CLOSE.GET.TRANSACTIONS_BALANCE}`, authenticateJWT, (request: Request, response: Response) => {
    return selectBalanceByUserId(request, response);
});

const routes = listEndpoints(app);
console.table(routes.map(route => ({
    path: route.path,
    methods: route.methods.join(', '),
    middlewares: route.middlewares.join(', ')
})));

app.listen(PORT, async () => {
    await dbConnect();
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to DB`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
