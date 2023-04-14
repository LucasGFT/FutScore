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
            timeCasaName: { type: String, required: true },
            horario: { type: Date, required: true },
            timeForaName: { type: String, required: true },
            golsTimeCasa: { type: Number, required: true },
            golsTimeFora: { type: Number, required: true },
        }), 'partidas');
    }
}
exports.default = TimesODM;
//# sourceMappingURL=PartidasODM.js.map