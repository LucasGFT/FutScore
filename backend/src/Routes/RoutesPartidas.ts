import { Router } from 'express';
import PartidasController from '../Controllers/partidas.controller';

const routesPartidas = Router();

routesPartidas.post('/partida/register', (req, res, next) => {
  new PartidasController().create(req, res, next);
});

routesPartidas.get('/partida/status', (req, res, next) => {
  new PartidasController().findStatusPartidas(req, res, next);
});

routesPartidas.put('/partida/placar', (req, res, next) => {
  new PartidasController().updatedPlacar(req, res, next);
});

routesPartidas.put('/partida/status', (req, res, next) => {
  new PartidasController().updatedStatus(req, res, next);
});

routesPartidas.put('/partida/pontos', (req, res, next) => {
  new PartidasController().updatedPontosStatus(req, res, next);
});

routesPartidas.get('/partidas/:time', (req, res, next) => {
  new PartidasController().getPartidasTimeEspecifico(req, res, next);
});

export default routesPartidas;