import mongoose from "mongoose";
import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import ITimes from '../interfaces/ITimes';
import IPartidas from "../interfaces/IPartidas";

class PartidasODM extends AbstractODM <IPartidas> {
  constructor() {
    super(
      new Schema<IPartidas>({
        timeCasaName: { type: String, required: true },
        timeForaName: { type: String, required: true },
        horario: { type: Date, required: true },
        golsTimeFora: { type: Number, required: true },
        golsTimeCasa: { type: Number, required: true },
        comecou: { type: Boolean, required: true },
        terminou: { type: Boolean, required: true },
      }),
      'partidas',
    );
  }
}

export default PartidasODM;