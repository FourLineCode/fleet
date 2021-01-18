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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const typeorm_1 = require("typeorm");
const api_1 = __importDefault(require("./api"));
const error_1 = require("./middlewares/error");
const seed_1 = __importDefault(require("./seed"));
require('dotenv').config();
const app = express_1.default();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.use(express_1.default.json());
        app.use(cors_1.default({ origin: process.env.ORIGIN || 'http://localhost:3000' }));
        app.use(morgan_1.default('dev'));
        app.use(helmet_1.default());
        app.use(cookie_parser_1.default());
        yield typeorm_1.createConnection();
        app.get('/', (req, res) => {
            res.send({
                message: 'Welcome!',
            });
        });
        app.use('/api', api_1.default);
        app.use(error_1.notFound);
        app.use(error_1.errorHandler);
        const PORT = process.env.PORT || 5000;
        yield app.listen(PORT, () => {
            console.log(`\nServer started on http://localhost:${PORT}...\n`);
        });
        seed_1.default();
    }
    catch (error) {
        console.log(error);
    }
});
init();
