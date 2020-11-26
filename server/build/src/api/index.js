"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const tweetRoutes_1 = __importDefault(require("./tweetRoutes"));
const router = express_1.Router();
router.use('/user', userRoutes_1.default);
router.use('/tweet', tweetRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map