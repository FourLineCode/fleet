"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const registerShema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).max(18).required(),
    username: joi_1.default.string()
        .min(2)
        .max(32)
        .regex(/^[A-Za-z0-9_]{1,15}$/)
        .required(),
    displayName: joi_1.default.string().min(2).max(32).required(),
    isAdmin: joi_1.default.boolean(),
});
exports.default = registerShema;
//# sourceMappingURL=registerSchema.js.map