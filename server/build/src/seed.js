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
const Fleet_1 = __importDefault(require("./entity/Fleet"));
const Follow_1 = __importDefault(require("./entity/Follow"));
const User_1 = __importDefault(require("./entity/User"));
const seed_database = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne();
        if (user)
            return;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash('akmal123', salt);
        const adminUser = yield User_1.default.create({
            username: 'akmal',
            displayName: 'Akmal Hossain',
            email: 'akmal@rip.com',
            password: passwordHash,
            isAdmin: true,
            bio: 'I made this website, i dont know what else to tell you about me LOL',
        });
        yield adminUser.save();
        for (const n of Array(10).keys()) {
            const username = `demo${n}`;
            const displayName = `demo-user-${n}`;
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash('admin', salt);
            const newUser = yield User_1.default.create({
                username,
                displayName,
                email: `${username}@rip.com`,
                password: passwordHash,
                isAdmin: false,
                bio: `This is automated bio for ${displayName}`,
            });
            yield newUser.save();
            if (n % 2 == 0) {
                yield Follow_1.default.create({ from: newUser, to: adminUser }).save();
            }
            for (const _ of Array(5).keys()) {
                yield Fleet_1.default.create({
                    body: `Example Fleet by demo user ${n}`,
                    author: newUser,
                }).save();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = seed_database;
