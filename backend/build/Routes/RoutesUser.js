"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../Controllers/users.controller"));
const routesUser = (0, express_1.Router)();
routesUser.get('/register/:email', (req, res, next) => {
    new users_controller_1.default().getUser(req, res, next);
});
routesUser.post('/register', (req, res, next) => {
    new users_controller_1.default().create(req, res, next);
});
routesUser.get('/verifyjwt', (req, res, next) => {
    new users_controller_1.default().verifyToken(req, res, next);
});
exports.default = routesUser;
//# sourceMappingURL=RoutesUser.js.map