import chai = require("chai")
import { Model} from "mongoose"
import UserDomain from '../../../src/Domains/User';
import Sinon = require("sinon")
import IUser from "../../../src/interfaces/IUser";
import UserService from "../../../src/Service/users.service";
import { token, userCreate } from "./mockService/users.mock";
import { gnToken } from "../../../src/utils/token.jwt";
import { decodedToken } from "../../../src/utils/token.jwt";
const expect = chai.expect


function createUserDomains(user: IUser) {
    const result = new UserDomain(user);
    return result;
}

describe('testes user', () => {
    it('create users', async () => {
        const service = new UserService();
        Sinon.stub(Model, 'create').resolves(userCreate)
        const token = gnToken({ email: 'asdasd', password: 'asdsd' })
        const result = await service.createUser({ email: 'asdasd', password: 'asdsd' })
        const test = decodedToken(result)
        if (typeof test?.payload === 'object' && test?.payload !== null && 'email' in test?.payload) {
            const email = test?.payload.email;
            expect(email).to.be.eq('asdasd')
        }
    })
    describe('verificar cargo', () => {
        it('conseguir verificar cargo', async () => {
            const service = new UserService();
            Sinon.stub(Model, 'findOne').resolves(userCreate)
            const result = await service.verifyRole(`Bearer ${token}`);
            expect(result.token).to.be.eq(200)
        })
        it('erro token invalido ao verificar cargo', async () => {
            const service = new UserService();
            Sinon.stub(Model, 'findOne').resolves(userCreate)
            const result = await service.verifyRole(`Bearer ansbdlajbdljasjhdlajsd${token}khasgdhavdhvahksdh`);
            expect(result.message).to.be.eq('Token inválido')
        })
        it('erro token de autenticacao invalido ao verificar cargo', async () => {
            const service = new UserService();
            Sinon.stub(Model, 'findOne').resolves(userCreate)
            const result = await service.verifyRole(`qlqcoisa ${token}`);
            expect(result.message).to.be.eq('Token de autenticação inválido')
        })
    })
    it('get user', async () => {
        const service = new UserService();
        Sinon.stub(Model, 'findOne').resolves(userCreate)
        const result = await service.getUsers(userCreate.email); 
        const domain = createUserDomains(userCreate)
        expect(JSON.stringify(result)).to.be.eq(JSON.stringify(domain))
    })
    it('retorno null ao tentar get user', async () => {
        const service = new UserService();
        Sinon.stub(Model, 'findOne').resolves(null)
        const result = await service.getUsers(userCreate.email); 
        expect(result).to.be.eq(null)
    })
    it('find user', async () => {
        let test;
        const service = new UserService();
        Sinon.stub(Model, 'findOne').resolves(userCreate)
        const result = await service.findUser(userCreate.email, userCreate.password);
        if (result) test = decodedToken(result)
        if (typeof test?.payload === 'object' && test?.payload !== null && 'email' in test?.payload) {
            const email = test?.payload.email;
            expect(email).to.be.eq('asdasd')
        }
    })
    it('error de nao achar o usuario', async () => {
        const service = new UserService();
        Sinon.stub(Model, 'findOne').resolves(null)
        const result = await service.findUser(userCreate.email, userCreate.password);
        expect(result).to.be.eq(false)
    })

    afterEach(function () {
        Sinon.restore();
      });

})