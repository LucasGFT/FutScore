import { NextFunction, Request, Response } from 'express';
import TimesService from '../Service/times.service';
import ITimes from '../interfaces/ITimes';

class TimesController {
  private service: TimesService;

  constructor() {
    this.service = new TimesService();
  }

  public async getTimes(_req: Request, res: Response, _next: NextFunction) {
    try {
      const times = await this.service.getTimes();
      return res.status(201).json(times);
    } catch (error) {
      console.log(error);
    }
  }
  
  public async create(req: Request, res: Response, _next: NextFunction) {
    const { nome, estado, quantidadeJogadores, estadio } = req.body;
    const time = {
      nome,
      estado,
      quantidadeJogadores,
      estadio,
      partidas: {
        vitorias: 0,
        derrotas: 0,
        empates: 0
      }
    };
    try {
      const newTime = await this.service.createTimes(time);
      return res.status(201).json(newTime);
    } catch (error: any) {
      return res.status(400).json(error.message)
    }
  }
}

export default TimesController;
