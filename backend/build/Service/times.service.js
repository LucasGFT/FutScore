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
const Times_1 = __importDefault(require("../Domains/Times"));
const TimesODM_1 = __importDefault(require("../Models/TimesODM"));
class TimesService {
    createTimesDomains(time) {
        return new Times_1.default(time);
    }
    createArrayTimesDomains(time) {
        const array = time.map((element) => new Times_1.default(element));
        return array;
    }
    createTimes(times) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeODM = new TimesODM_1.default();
            const newTime = yield timeODM.create(times);
            return this.createTimesDomains(newTime);
        });
    }
    getTimes() {
        return __awaiter(this, void 0, void 0, function* () {
            const timeODM = new TimesODM_1.default();
            const times = yield timeODM.getAll();
            return this.createArrayTimesDomains(times);
        });
    }
}
exports.default = TimesService;
//# sourceMappingURL=times.service.js.map