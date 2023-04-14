"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const times_controller_1 = __importDefault(require("../Controllers/times.controller"));
const routesUser = (0, express_1.Router)();
routesUser.post('/times/register', (req, res, next) => {
    new times_controller_1.default().create(req, res, next);
});
routesUser.get('/times', (req, res, next) => {
    new times_controller_1.default().getTimes(req, res, next);
});
exports.default = routesUser;
//# sourceMappingURL=RoutesTimes.js.map