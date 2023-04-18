import express from 'express';
import cors from 'cors';
import routesUser from '../Routes/Routes';
import ErrorHandler from '../Middleware/ErrorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routesUser);
app.use(ErrorHandler.handle);


export default app;
