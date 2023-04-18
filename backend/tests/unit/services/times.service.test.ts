import chai = require("chai")
import { Model } from "mongoose"
import TimesDomain from '../../../src/Domains/Times';
import Sinon = require("sinon")
import TimesSerice from "../../../src/Service/times.service"
import { arrayTimes, time } from "./mockService/times.mock"
import ITimes from "../../../src/interfaces/ITimes";
const expect = chai.expect


function createArrayTimesDomains(time: ITimes[]) {
    const array = time.map((element) => new TimesDomain(element));
    return array;
}

function createTimeDomains(time: ITimes) {
    const array = new TimesDomain(time);
    return array;
}

describe('rota /times/', () => {
    it('get times', async () => {
        const service = new TimesSerice()
        const teste = createArrayTimesDomains(arrayTimes)
        Sinon.stub(Model, 'find').resolves(arrayTimes)
        const result = await service.getTimes();
        expect(JSON.stringify(result)).to.be.eq(JSON.stringify(teste))
    })
    it('create times', async () => {
        const service = new TimesSerice()
        Sinon.stub(Model, 'create').resolves(arrayTimes[1])
        const teste = createTimeDomains(arrayTimes[1])
        const result = await service.createTimes(time);
        expect(JSON.stringify(result)).to.be.eq(JSON.stringify(teste))
    })
    it('erro ao criar time', async () => {
        const service = new TimesSerice()
        Sinon.stub(Model, 'create').resolves()
        try {
            await service.createTimes(time);
        } catch (error: any) {
            expect(error.message).to.be.eq('Esse time ja foi criado')
        }
    })
    afterEach(function () {
        Sinon.restore();
      });

})