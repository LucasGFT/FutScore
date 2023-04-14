"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Domains/User"));
const UsersODM_1 = __importDefault(require("../Models/UsersODM"));
const token_jwt_1 = require("../utils/token.jwt");
class UserService {
    createUserDomains(User) {
        return new User_1.default(User);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userODM = new UsersODM_1.default();
            const newUser = yield userODM.create(user);
            const userToken = { email: user.email, password: user.password, cargo: newUser.cargo };
            const token = (0, token_jwt_1.gnToken)(userToken);
            this.createUserDomains(newUser);
            return token;
        });
    }
    verifyRole(tokenHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            const userODM = new UsersODM_1.default();
            const parts = tokenHeader.split(' ');
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                return { token: 401, message: 'Token de autenticação inválido' };
            }
            const token = parts[1];
            const jwtDecoded = (0, token_jwt_1.decodedToken)(token);
            if (jwtDecoded && typeof jwtDecoded !== 'string') {
                const { payload } = jwtDecoded;
                const { email } = JSON.parse(JSON.stringify(payload));
                const user = yield userODM.findByEmail(email);
                return { token: 200, message: user };
            }
            return { token: 401, message: 'Token inválido' };
        });
    }
    getUsers(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userODM = new UsersODM_1.default();
            const resultUser = yield userODM.findByEmail(email);
            if (resultUser === null)
                return null;
            return this.createUserDomains(resultUser);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map