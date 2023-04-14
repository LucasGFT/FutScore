import express from 'express';
// import ErrorHandler from './Middleware/ErrorHandler';
import cors from 'cors';
import routesUser from '../Routes/Routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routesUser);

// app.use(ErrorHandler.handle);

export default app;
