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
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../entity/User"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
            throw new Error('Authorization failed');
        }
        // TODO: Romove this in production
        const [type, token] = header.split(' ');
        if (type !== 'Bearer') {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Token must be prefixed with Bearer');
        }
        if (!token) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
            throw new Error('Authorization failed');
        }
        const validated = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'sercet');
        if (!validated) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
            throw new Error('Authorization failed');
        }
        const user = yield User_1.default.findOne({ id: validated.id });
        if (user === null || user === void 0 ? void 0 : user.isAdmin) {
            req.admin = true;
        }
        req.user = user;
        req.userId = user === null || user === void 0 ? void 0 : user.id;
        req.authorized = true;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
