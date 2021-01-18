"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const replySchema = joi_1.default.object({
    body: joi_1.default.string().min(1).max(240).required(),
});
exports.default = replySchema;
