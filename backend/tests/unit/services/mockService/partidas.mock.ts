import mongoose, { Schema } from "mongoose"

const arrayPartidasCruzeiro = [
    {
        _id: '643d4d72a083a93400ed5cad',
        timeCasaName: 'Cruzeiro',
        timeForaName: 'Flamengo',
        horario: new Date('2022-04-10T15:30:00.000Z'),
        golsTimeFora: 0,
        golsTimeCasa: 0,
        comecou: false,
        terminou: false,
        __v: 0
      }
]

const partidaCreate = {
  _id: new mongoose.Types.ObjectId(),
  timeCasaName: 'Cruzeiro',
  timeForaName: 'Flamengo',
  horario: new Date('2022-04-10T15:30:00.000Z'),
  golsTimeFora: 0,
  golsTimeCasa: 0,
  comecou: true,
  terminou: false,
  __v: 0
}

const retornoPartidaCreate = {
  timeCasaName: 'Cruzeiro',
  timeForaName: 'Flamengo',
  horario: new Date('2022-04-10T15:30:00.000Z'),
  golsTimeFora: 0,
  golsTimeCasa: 0,
  comecou: true,
  terminou: false,
}

const arrayVariasPartidas = [
    {
        _id: '643d4d72a083a93400ed5cad',
        timeCasaName: 'Cruzeiro',
        timeForaName: 'Flamengo',
        horario: new Date('2022-04-10T15:30:00.000Z'),
        golsTimeFora: 0,
        golsTimeCasa: 3,
        comecou: true,
        terminou: false,
        __v: 0
      },
      {
        _id: '643d4d72a083a93400ed7sqe',
        timeCasaName: 'Santos',
        timeForaName: 'Palmeiras',
        horario: new Date('2022-04-10T15:30:00.000Z'),
        golsTimeFora: 0,
        golsTimeCasa: 3,
        comecou: false,
        terminou: false,
        __v: 0
      },
      {
        _id: '643d4d72a083a93400ed7ysk',
        timeCasaName: 'Gremio',
        timeForaName: 'Internacional',
        horario: new Date('2022-04-10T15:30:00.000Z'),
        golsTimeFora: 0,
        golsTimeCasa: 3,
        comecou: true,
        terminou: true,
        __v: 0
      },
]

const separacaoStatusPartidasdoArray = { 
        andamentos: [
            {
                _id: '643d4d72a083a93400ed5cad',
                timeCasaName: 'Cruzeiro',
                timeForaName: 'Flamengo',
                horario: new Date('2022-04-10T15:30:00.000Z'),
                golsTimeFora: 0,
                golsTimeCasa: 3,
                comecou: true,
                terminou: false,
                __v: 0
              }
        ],
        naoComecou: [
            {
                _id: '643d4d72a083a93400ed7sqe',
                timeCasaName: 'Santos',
                timeForaName: 'Palmeiras',
                horario: new Date('2022-04-10T15:30:00.000Z'),
                golsTimeFora: 0,
                golsTimeCasa: 3,
                comecou: false,
                terminou: false,
                __v: 0
              }
        ],
        terminadas: [
            {
                _id: '643d4d72a083a93400ed7ysk',
                timeCasaName: 'Gremio',
                timeForaName: 'Internacional',
                horario: new Date('2022-04-10T15:30:00.000Z'),
                golsTimeFora: 0,
                golsTimeCasa: 3,
                comecou: true,
                terminou: true,
                __v: 0
              }
        ],

    }

const objTime = {
    nome: 'Cruzeiro',
    _id: "6439c5f7fb77d1fde93a3477",
    estado: 'Minas Gerais',
    estadio: 'Mineirão',
    quantidadeJogadores: 25,
    partidas: { vitorias: 0, empates: 0, derrotas: 0 },
    __v: 0
}

export { 
  arrayPartidasCruzeiro,
  objTime,
  arrayVariasPartidas,
  separacaoStatusPartidasdoArray,
  partidaCreate,
  retornoPartidaCreate,
 }