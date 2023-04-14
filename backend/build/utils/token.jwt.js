"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedToken = exports.gnToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const secretKey = fs_1.default.readFileSync('./jwt.evaluation.key');
const config = {
    algorithm: 'HS256',
    expiresIn: '1h',
};
const gnToken = (payloa) => jsonwebtoken_1.default.sign(payloa, secretKey, config);
exports.gnToken = gnToken;
const decodedToken = (token) => jsonwebtoken_1.default.decode(token, { complete: true });
exports.decodedToken = decodedToken;
//# sourceMappingURL=token.jwt.js.map