import mongoose from 'mongoose';
import ITimes from '../interfaces/ITimes';
import IPartidas from '../interfaces/IPartidas';

class Times {
  protected nome: string;
  protected estado: string;
  protected estadio?: string;
  protected quantidadeJogadores: number;
  protected partidas: { vitorias: Number, derrotas: Number, empates: Number };

  constructor(time: ITimes) {
    this.partidas = time.partidas;
    this.nome = time.nome;
    this.estado = time.estado;
    this.estadio = time.estadio;
    this.quantidadeJogadores = time.quantidadeJogadores;
  }

  getNome(): string {
    return this.nome;
  }

  getEstado(): string {
    return this.estado;
  }

  getEstadio(): string | undefined {
    return this.estadio;
  }

  getQuantidadeDeJogadores(): number {
    return this.quantidadeJogadores;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  setEstado(estado: string): void {
    this.estado = estado;
  }

  setEstadio(estadio: string): void {
    this.estadio = estadio;
  }

  setQuantidadeDeJogadores(quantidadeJogadores: number): void {
    this.quantidadeJogadores = quantidadeJogadores;
  }
}

export default Times;
