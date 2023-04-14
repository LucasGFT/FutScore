import mongoose, { Schema } from "mongoose";

export default interface IPartidas {
  timeCasaName: string;
  timeForaName: string;
  horario: Date;
  golsTimeCasa: number;
  golsTimeFora: number;
  comecou: boolean;
  terminou: boolean;
}