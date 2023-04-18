import chai = require("chai")
import { Model, Schema } from "mongoose"
import Sinon = require("sinon")
import PartidasService from "../../../src/Service/partidas.service"
import { arrayPartidasCruzeiro, arrayVariasPartidas, objTime, partidaCreate, retornoPartidaCreate, separacaoStatusPartidasdoArray } from "./mockService/partidas.mock"
const expect = chai.expect


describe('rota /partida/', () => {

    it('pegar partidas time especifico', async () => {
        const service = new PartidasService();
            Sinon.stub(Model, 'find').resolves(arrayPartidasCruzeiro)
            Sinon.stub(Model, 'findOne').resolves(objTime)
            const result = await service.getPartidasTimeEspecifico('Cruzeiro')
            expect(result).to.be.deep.eq(arrayPartidasCruzeiro)
    })
    it('retorna partidas de acordo com status', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'find').resolves(arrayVariasPartidas)
        const result = await service.findByTime();
        expect(result).to.be.deep.eq(separacaoStatusPartidasdoArray)
    })
    it('atualizar status', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findOneAndUpdate').resolves()
        const e = await service.atualizarStatus(new Schema.Types.ObjectId('643d4d7hsalkdaghdhagsd2a083a93400ed5cad'), 'comecou', true)
        expect(e).to.equal(undefined)
    })
    it('error ao atualizar status', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findOneAndUpdate').resolves(null)
        const e = await service.atualizarStatus(new Schema.Types.ObjectId('643d4d7hsalkdaghdhagsd2a083a93400ed5cad'), 'comecou', true)
        expect(e?.message).to.be.eq('nao achou essa partida')
    })
    it('atualizar placar', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findOneAndUpdate').resolves();
        const result = await service.atualizarPlacar(new Schema.Types.ObjectId('643d4d7hsalkdaghdhagsd2a083a93400ed5cad'), { timeCasa: 2, timeFora: 1 })
        expect(result).to.equal(undefined)
    })
    it('error ao atualizar placar', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findOneAndUpdate').resolves(null)
        const result = await service.atualizarPlacar(new Schema.Types.ObjectId('643d4d7hsal93400ed5cad'), { timeCasa: 2, timeFora: 1 })
        expect(result?.message).to.be.eq('nao achou essa partida')
    })
    it('alterar pontos para casa haja empate', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findById').resolves(arrayPartidasCruzeiro[0])
        Sinon.stub(Model, 'updateMany').resolves()
        const result = await service.updatedPontosStatus(new Schema.Types.ObjectId('643d4d72a083a93400ed5cad'))
        expect(result).to.equal(undefined)
    })
    it('nao alterar pontos status quando nao achar partida', async () => {
        const service = new PartidasService();
        Sinon.stub(Model, 'findById').resolves()
        Sinon.stub(Model, 'findOneAndUpdate').resolves()
        const result = await service.updatedPontosStatus(new Schema.Types.ObjectId('643d4d72a083a93400ed5cad'))
        expect(result).to.equal(undefined)
    })
    it('criar partida', async () => {
        const service = new PartidasService()
        Sinon.stub(Model, 'findOne').resolves();
        Sinon.stub(Model, 'create').resolves(partidaCreate);
        Sinon.stub(Model, 'find').resolves(['time1', 'time2'])
        const result = await service.createPartidas(partidaCreate)
        expect(result.getTimeCasaName()).to.be.eq(retornoPartidaCreate.timeCasaName)
    })
    it('erro partida ja criado', async () => {
        const service = new PartidasService()
        Sinon.stub(Model, 'findOne').resolves('ja tem');
        Sinon.stub(Model, 'find').resolves(['time1', 'time2'])
        try {
            await service.createPartidas(partidaCreate)
        } catch (error: any) {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.be.eq('Partida ja foi criada')
        }
    })
    it('erro time nao encontrado', async () => {
        const service = new PartidasService()
        Sinon.stub(Model, 'findOne').resolves();
        Sinon.stub(Model, 'create').resolves(partidaCreate);
        Sinon.stub(Model, 'find').resolves(['time1'])
        try {
            await service.createPartidas(partidaCreate)
            
        } catch (error: any) {
            expect(error.message).to.be.eq('Time(s) Nao Encontrado') 
        }
    })

    it('pegar partidas de time especifico', async () => {
        const service = new PartidasService()
        Sinon.stub(Model, 'findOne').resolves()
        Sinon.stub(Model, 'find').resolves(arrayPartidasCruzeiro)
        const result = await service.getPartidasTimeEspecifico('Cruzeiro')
        expect(result).to.be.eq(arrayPartidasCruzeiro)
    })

    it('erro ao tentar pegar partidas de time especifico', async () => {
        const service = new PartidasService()
        Sinon.stub(Model, 'findOne').resolves(null)
        try {
            await service.getPartidasTimeEspecifico('Cruzeiro')
        } catch (error: any) {
            expect(error.message).to.be.eq('Não Tem Esse Time')
        }
    })
    

    afterEach(function () {
        Sinon.restore();
      });

})