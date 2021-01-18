"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fleetRoutes_1 = __importDefault(require("./fleetRoutes"));
const followRoutes_1 = __importDefault(require("./followRoutes"));
const searchRoutes_1 = __importDefault(require("./searchRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const router = express_1.Router();
router.use('/user', userRoutes_1.default);
router.use('/fleet', fleetRoutes_1.default);
router.use('/follow', followRoutes_1.default);
router.use('/search', searchRoutes_1.default);
exports.default = router;
