"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class TimesODM extends AbstractODM_1.default {
    constructor() {
        super(new mongoose_1.Schema({
            nome: { type: String, required: true, unique: true },
            estado: { type: String, required: true },
            estadio: { type: String },
            quantidadeJogadores: { type: Number, required: true },
        }), 'times');
    }
}
exports.default = TimesODM;
//# sourceMappingURL=TimesODM.js.map