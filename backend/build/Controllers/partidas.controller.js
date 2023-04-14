"use strict";
// import { NextFunction, Request, Response } from 'express';
// import TimesService from '../Service/times.service';
// import ITimes from '../interfaces/ITimes';
// import Times from '../Domains/Times';
// import mongoose from 'mongoose';
// class TimesController {
//   private service: TimesService;
//   constructor() {
//     this.service = new TimesService();
//   }
//   public async getTimes(_req: Request, res: Response, _next: NextFunction) {
//     try {
//       const times = await this.service.getTimes();
//       return res.status(201).json(times);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   public async create(req: Request, res: Response, next: NextFunction) {
//     const { nome, estado, quantidadeJogadores, estadio } = req.body;
//     const novoTime: ITimes = new Times({
//         _id: JSON.stringify(new mongoose.Types.ObjectId),
//         nome,
//         estado,
//         quantidadeJogadores,
//         estadio,
//     })
//     try {
//       const newTime = await this.service.createTimes(novoTime);
//       return res.status(201).json(newTime);
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
// export default TimesController;
//# sourceMappingURL=partidas.controller.js.map