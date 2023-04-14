import IPartidas from '../interfaces/IPartidas';
import mongoose from 'mongoose';

class Partidas {

  protected timeCasaName: string;
  protected horario: Date;
  protected timeForaName: string;
  protected golsTimeCasa: number;
  protected golsTimeFora: number;
  protected terminou: boolean;
  protected comecou: boolean;

  constructor(partida: IPartidas) {
    this.timeCasaName = partida.timeCasaName;
    this.horario = partida.horario;
    this.timeForaName = partida.timeForaName;
    this.golsTimeCasa = partida.golsTimeCasa;
    this.golsTimeFora = partida.golsTimeFora;
    this.comecou = partida.comecou;
    this.terminou = partida.terminou;
  }

  getTimeCasaName(): string {
    return this.timeCasaName;
  }

  getTimeForaName(): string {
    return this.timeForaName;
  }

  getHorario(): Date {
    return this.horario;
  }

  getGolsTimeCasa(): number {
    return this.golsTimeCasa;
  }

  getGolsTimeFora(): number {
    return this.golsTimeFora;
  }

  getComecou(): boolean {
    return this.comecou;
  }

  getTerminou(): boolean {
    return this.terminou;
  }

  setTimeCasaName(name: string): void {
    this.timeCasaName = name;
  }

  setTimeForaName(name: string): void {
    this.timeForaName = name;
  }

  setHorario(data: Date): void {
    this.horario = data;
  }

  setGolsTimeCasa(goals: number): void {
    this.golsTimeCasa = goals;
  }

  setGolsTimeFora(goals: number): void {
    this.golsTimeFora = goals;
  }

  setComecou(bool: boolean): void {
    this.comecou = bool;
  }

  setTerminou(bool: boolean): void {
    this.terminou = bool;
  }
}

export default Partidas;
