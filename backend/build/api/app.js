"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import ErrorHandler from './Middleware/ErrorHandler';
const cors_1 = __importDefault(require("cors"));
const Routes_1 = __importDefault(require("../Routes/Routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(Routes_1.default);
// app.use(ErrorHandler.handle);
exports.default = app;
//# sourceMappingURL=app.js.map