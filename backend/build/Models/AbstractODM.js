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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AbstractODM {
    constructor(schema, documentModel) {
        this.schema = schema;
        this.model = mongoose_1.models[documentModel] || (0, mongoose_1.model)(documentModel, this.schema);
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.create(Object.assign({}, user));
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.findOne({ email });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.model.find();
        });
    }
}
exports.default = AbstractODM;
//# sourceMappingURL=AbstractODM.js.map