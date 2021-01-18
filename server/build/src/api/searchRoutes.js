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
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entity/User"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.Router();
// Recommend users to follow
router.get('/recommend', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        const currentUser = yield typeorm_1.getManager()
            .getRepository(User_1.default)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: req.userId })
            .leftJoinAndSelect('user.following', 'following')
            .leftJoinAndSelect('following.from', 'from')
            .leftJoinAndSelect('following.to', 'to')
            .getOne();
        const followedUsers = currentUser === null || currentUser === void 0 ? void 0 : currentUser.following;
        const followedUserIds = (followedUsers === null || followedUsers === void 0 ? void 0 : followedUsers.map((follow) => String(follow.to.id))) || [];
        followedUserIds.push(String(req.userId));
        const filteredUsers = users.filter((user) => !followedUserIds.includes(String(user.id)));
        const response = [];
        for (let i = 0; i < 5; i++) {
            response.push(filteredUsers.splice(Math.floor(Math.random() * filteredUsers.length), 1)[0]);
            if (!filteredUsers.length)
                break;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(response);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
