"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AbstractODM_1 = __importDefault(require("./AbstractODM"));
class UsersODM extends AbstractODM_1.default {
    constructor() {
        super(new mongoose_1.Schema({
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            cargo: { type: String, required: true, default: 'cliente' },
        }), 'users');
    }
}
exports.default = UsersODM;
//# sourceMappingURL=UsersODM.js.map