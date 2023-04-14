import mongoose from "mongoose";
import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import ITimes from '../interfaces/ITimes';
// import { PartidaSchema } from "./PartidasODM";

class TimesODM extends AbstractODM <ITimes> {
  constructor() {
    super(
      new Schema<ITimes>({
        nome: { type: String, required: true, unique: true },
        estado: { type: String, required: true },
        estadio: { type: String },
        quantidadeJogadores: { type: Number, required: true },
        partidas: { type: Object, default: { vitorias: 0,
          derrotas: 0,
          empates: 0} },
      }),
      'times',
    );
  }
}

export default TimesODM;
