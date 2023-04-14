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
const users_service_1 = __importDefault(require("../Service/users.service"));
class UserController {
    constructor() {
        this.service = new users_service_1.default();
    }
    create(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = {
                email, password,
            };
            try {
                const newUser = yield this.service.createUser(user);
                return res.status(201).json({ token: newUser });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getUser(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const resultUser = yield this.service.getUsers(email);
            if (resultUser === null)
                return res.status(202).json(false);
            return res.status(201).json(true);
        });
    }
    verifyToken(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenHeader = req.headers.authorization;
            if (!tokenHeader)
                return res.status(401).json('Token não fornecido');
            const result = yield this.service.verifyRole(tokenHeader);
            return res.status(result.token).json(result.message);
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=users.controller.js.map