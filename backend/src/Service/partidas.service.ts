import { Schema } from 'mongoose';
import PartidasDomains from '../Domains/Partidas';
// import PartidasODM from '../Models/PartidasODM';
import TimesODM from '../Models/TimesODM';
import IPartidas from '../interfaces/IPartidas';
import PartidasODM from '../Models/PartidasODM';

class PartidasService {
  private createPartidasDomains(partida: IPartidas) {
    return new PartidasDomains(partida);
  }

  public async findByTime() {
    const partidaODM = new PartidasODM();
    const resultFind: IPartidas[] = await partidaODM.getAll();
    const andamentos = resultFind.filter(partida => partida.comecou && !partida.terminou)
    const terminadas = resultFind.filter(partida => partida.comecou && partida.terminou)
    const naoComecou = resultFind.filter(partida => !partida.comecou)

    const objResult = {
      naoComecou,
      andamentos,
      terminadas,
      }
    return objResult
  }

  public async atualizarPlacar(id: Schema.Types.ObjectId, objPlacar: { timeCasa: number, timeFora: number }) {
    const partidaODM = new PartidasODM()
    try {
      await partidaODM.updatedPlacar(id, objPlacar)
    } catch (error) {
      console.log(error)
    }
  }

  public async atualizarStatus(id: Schema.Types.ObjectId,  key: string, value: boolean) {
    const partidaODM = new PartidasODM();
    try {
      await partidaODM.alterarStatusEspecifico(id, key, value)
    } catch (error) {
      console.log(error)
    }
  }

  public async updatedPontosStatus(id: Schema.Types.ObjectId) {
    const partidaODM = new PartidasODM();
    const timeODM = new TimesODM();
    const s = await partidaODM.findPontosStatus(id)
    if (s) await timeODM.updatedPontos(s.vitoria, s.derrota, s.empate)
  }

  public async createPartidas(partida: IPartidas) {
    const { timeCasaName, timeForaName} = partida
    const partidaODM = new PartidasODM();
    const timesODM = new TimesODM();
    const jaExiste = await partidaODM.verificaJaExistePartida(timeCasaName, timeForaName)
    const verificaTimes = await timesODM.verificaTimes(timeCasaName, timeForaName);
    if (jaExiste) {
      throw new Error('Partida ja foi criada')
    }
    if (verificaTimes) { 
      const newPartida = await partidaODM.create(partida)
      return this.createPartidasDomains(newPartida);
     } else {
       throw new Error('Time(s) Nao Encontrado')
     }
  }

  public async getPartidasTimeEspecifico(name: string) {
    const partidasODM = new PartidasODM();
    const timesODM = new TimesODM();
    const time = await timesODM.findOne('nome', name)
    const partidasTime = await partidasODM.findTime(name);
    if(time === null) throw new Error('Não Tem Esse Time')
    return partidasTime
  }

}

export default PartidasService;
