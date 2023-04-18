import { NextFunction, Request, Response } from 'express';
import PartidasService from '../Service/partidas.service';
import mongoose, { Schema, Types } from 'mongoose';
import IPartidas from '../interfaces/IPartidas';
import { nextTick } from 'process';

class PartidasController {
  private service: PartidasService;

  constructor() {
    this.service = new PartidasService();
  }

  public async updatedPlacar(req: Request, res: Response, next: NextFunction) {
    const { id, golsTimeCasa, golsTimeFora } = req.body;
    const objGols = { timeCasa: golsTimeCasa, timeFora: golsTimeFora }
    try {
      await this.service.atualizarPlacar(id, objGols)
      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  public async updatedPontosStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await this.service.updatedPontosStatus(id);
      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  public async updatedStatus(req: Request, res: Response, next: NextFunction) {
    const {id, keyAtualizar, valorAtualizar} = req.body;
    try {
      await this.service.atualizarStatus(id, keyAtualizar, valorAtualizar)
      return res.status(201).json()
    } catch (error) {
      next(error)
    }
  }

  public async findStatusPartidas(_req: Request, res: Response) {
    const partidas = await this.service.findByTime();
    return res.status(200).json(partidas);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { timeCasaName, timeForaName, horario, golsTimeCasa, golsTimeFora } = req.body;
    const obj: IPartidas = {
      timeCasaName, timeForaName, horario, golsTimeCasa, golsTimeFora, comecou: false, terminou: false,
    }
    try {
      const newPartida = await this.service.createPartidas(obj);
      return res.status(201).json(newPartida);
    } catch (error) {
      next(error)
    }
  }

  public async getPartidasTimeEspecifico(req: Request, res: Response, next: NextFunction) {
    const { time } = req.params;
    try {
      const partidasTime = await this.service.getPartidasTimeEspecifico(time);
      return res.status(201).json(partidasTime);
    } catch (error) {
      next(error)
    }
  }

}

export default PartidasController;
