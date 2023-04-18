import mongoose, { Schema, Model, models, model } from 'mongoose';
import IPartidas from '../interfaces/IPartidas';
import PartidasODM from './PartidasODM';

class AbstractODM<T> {
  private schema: Schema;
  private model: Model<T>;
  private modelPartidas: Model<IPartidas>;
  constructor(schema: Schema, documentModel: string) {
    this.schema = schema;
    this.model = models[documentModel] || model(documentModel, this.schema);
    this.modelPartidas = models[documentModel] || model(documentModel, this.schema);
  }

  public async create(user: T): Promise<T> {
    return this.model.create({ ...user });
  }

  public async insertMany(key: T[]) {
    await this.model.insertMany(key)
  }

  public async alterarStatusEspecifico(id: Schema.Types.ObjectId, key: string, value: boolean) {
    const query = {
      [key]: value,
    }
    const find = await this.model.findOneAndUpdate({_id: id}, query)
    return find
  }

  public async updatedPlacar(id: mongoose.Schema.Types.ObjectId, objPlacar: { timeCasa: number, timeFora: number }) {
    const find = await this.model.findOneAndUpdate({ _id: id }, { golsTimeCasa: objPlacar.timeCasa, golsTimeFora: objPlacar.timeFora });
    return find;
  }

  public async findOne(key: any, value: string | Schema.Types.ObjectId) {
    const query = {
      [key]: value,
    }
    return this.model.findOne(query);
  }

  public async findTime(timeName: string) {
      const result =  this.model.find({
      $or: [
        { timeCasaName: timeName },
        { timeForaName: timeName },
      ]
    });
    return result
  }

  public async findByEmail(email: string) {
    const result = await this.model.findOne({ email })
    return result
  }

  public async updatedPontos(timeGanhou: string, timePerdeu: string, empate: string[]) {
    if (empate.length !== 1) {
      await this.model.updateMany({ nome: { $in: [empate[0], empate[1]] } }, {
        $inc: { "partidas.empates": 1 }
      })
    } else {
      await this.model.findOneAndUpdate({ nome: timeGanhou }, {
        $inc: { "partidas.vitorias": 1 }
      })
      await this.model.findOneAndUpdate({ nome: timePerdeu }, {
        $inc: { "partidas.derrotas": 1 }
      })
    }
  }

  public async findPontosStatus(id: Schema.Types.ObjectId) {
    const partida = await this.model.findById({ _id: id }) as IPartidas | null;
    // estava assim : const partida = await this.model.findById({ _id: id }).exec() as IPartidas | null;
    const obj = {
      vitoria: '',
      derrota: '',
      empate: ['']
    };
    if(partida) {
      if (partida.golsTimeCasa > partida.golsTimeFora) {
        obj.vitoria = partida.timeCasaName;
        obj.derrota = partida.timeForaName;
      } else if (partida.golsTimeCasa < partida.golsTimeFora) {
        obj.vitoria = partida.timeForaName;
        obj.derrota = partida.timeCasaName;
      } else {
        obj.empate = [partida.timeForaName, partida.timeCasaName];
      }
      return obj;
    }
  }

  public async verificaJaExistePartida(nameCasa: string, nameFora: string) {
    const jaExitePartida = await this.model.findOne({ timeCasaName: nameCasa, timeForaName: nameFora })
    if (!jaExitePartida) return false;
    return true;
  }

  public async verificaTimes(nameCasa: string, nameFora: string) {
    const timeCasa = await this.model.find({ nome: { $in: [nameCasa, nameFora] } });
    if(timeCasa.length < 2) return false
    return true
  }

  public async getAll() {
    return this.model.find({});
  }

  public async getPartidasByStatus() {
    const partidas: IPartidas[] = await this.modelPartidas.find({})
    const andamentos = partidas.filter(partida => partida.comecou && !partida.terminou)
    const terminadas = partidas.filter(partida => partida.comecou && partida.terminou)
    const naoComecou = partidas.filter(partida => !partida.comecou)
    const objResult = {
      naoComecou,
      andamentos,
      terminadas,
      }
      return objResult
  }
}

export default AbstractODM;
