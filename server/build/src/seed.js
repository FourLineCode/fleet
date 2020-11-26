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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("./models/user"));
const seed_database = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne();
        if (user)
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash('akmal123', salt);
        const newUser = yield user_1.default.create({
            username: 'akmal',
            displayName: 'Akmal Hossain',
            email: 'akmal@rip.com',
            password: passwordHash,
            isAdmin: true,
        });
        yield newUser.save();
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = seed_database;
//# sourceMappingURL=seed.js.map