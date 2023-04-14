import { NextFunction, Request, Response } from 'express';
import PartidasService from '../Service/partidas.service';
// import ITimes from '../interfaces/ITimes';
// import Times from '../Domains/Times';
import mongoose, { Schema, Types } from 'mongoose';
import IPartidas from '../interfaces/IPartidas';

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
      return res.status(201).json('deu')
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  public async updatedPontosStatus(req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    try {
      await this.service.updatedPontosStatus(id);
      return res.status(201).json('deu')
    } catch (error) {
      console.log(error)
    }
  }

  public async updatedStatus(req: Request, res: Response, next: NextFunction) {
    const {id, keyAtualizar, valorAtualizar} = req.body;
    try {
      await this.service.atualizarStatus(id, keyAtualizar, valorAtualizar)
      return res.status(201).json('deu')
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  public async findStatusPartidas(req: Request, res: Response, next: NextFunction) {
    const { timeCasaName, timeForaName } = req.body;
    const partidas = await this.service.findByTime();
    return res.status(201).json(partidas);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { timeCasaName, timeForaName, horario, golsTimeCasa, golsTimeFora } = req.body;
    const obj: IPartidas = {
      timeCasaName, timeForaName, horario, golsTimeCasa, golsTimeFora, comecou: false, terminou: false,
    }
    try {
      const newPartida = await this.service.createPartidas(obj);
      return res.status(201).json(newPartida);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      } else {
        return res.status(400).json("Ocorreu um erro desconhecido");
      }
    }
  }

  public async getPartidasTimeEspecifico(req: Request, res: Response, _next: NextFunction) {
    const { time } = req.params;
    try {
      const partidasTime = await this.service.getPartidasTimeEspecifico(time);
      return res.status(201).json(partidasTime);
    } catch (error: any) {
      return res.status(400).json(error.message)
    }
  }

}

export default PartidasController;
