import { getApi } from "../api/apis";



export async function calcularPontuacao() {
    const { data } = await getApi('/times');
    const array = data.map(({ nome, partidas: { vitorias, derrotas, empates } }) => {
        const partidasJogadas = vitorias + derrotas + empates
        const pontos = (vitorias * 3) + empates;
        return { time: nome, vitorias, empates, derrotas, pontos, partidasJogadas }
    })
    
    return array.sort((a, b) => b.pontos - a.pontos);
}