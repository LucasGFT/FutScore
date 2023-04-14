export default interface ITimes {
  nome: string;
  estado: string;
  estadio?: string;
  quantidadeJogadores: number;
  partidas: {
    vitorias: Number,
    derrotas: Number,
    empates: Number
  }
}