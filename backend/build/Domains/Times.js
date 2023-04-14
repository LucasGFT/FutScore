"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Times {
    constructor(time) {
        this.nome = time.nome;
        this.estado = time.estado;
        this.estadio = time.estadio;
        this.quantidadeJogadores = time.quantidadeJogadores;
    }
    getNome() {
        return this.nome;
    }
    getEstado() {
        return this.estado;
    }
    getEstadio() {
        return this.estadio;
    }
    getQuantidadeDeJogadores() {
        return this.quantidadeJogadores;
    }
    setNome(nome) {
        this.nome = nome;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    setEstadio(estadio) {
        this.estadio = estadio;
    }
    setQuantidadeDeJogadores(quantidadeJogadores) {
        this.quantidadeJogadores = quantidadeJogadores;
    }
}
exports.default = Times;
//# sourceMappingURL=Times.js.map