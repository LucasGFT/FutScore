import { Router } from 'express';
import TimesController from '../Controllers/times.controller';

const routesTimes = Router();

routesTimes.post('/times/register', (req, res, next) => {
  new TimesController().create(req, res, next);
});

routesTimes.get('/times', (req, res, next) => {
  new TimesController().getTimes(req, res, next);
});

export default routesTimes;