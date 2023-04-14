import { Router } from 'express';
import UserController from '../Controllers/users.controller';

const routesUser = Router();

routesUser.get('/user/:email', (req, res, next) => {
  new UserController().getUser(req, res, next);
});

routesUser.post('/user/login', (req, res, next) => {
  new UserController().getLogin(req, res, next);
});

routesUser.post('/register', (req, res, next) => {
  new UserController().create(req, res, next);
});

routesUser.get('/verifyjwt', (req, res, next) => {
  new UserController().verifyToken(req, res, next);
});

export default routesUser;