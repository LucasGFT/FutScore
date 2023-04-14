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
const times_service_1 = __importDefault(require("../Service/times.service"));
class TimesController {
    constructor() {
        this.service = new times_service_1.default();
    }
    getTimes(_req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const times = yield this.service.getTimes();
                return res.status(201).json(times);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(req, res, _next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, estado, quantidadeJogadores, estadio } = req.body;
            const time = {
                nome,
                estado,
                quantidadeJogadores,
                estadio,
            };
            try {
                const newTime = yield this.service.createTimes(time);
                return res.status(201).json(newTime);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = TimesController;
//# sourceMappingURL=times.controller.js.map