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
const Follow_1 = __importDefault(require("../entity/Follow"));
const User_1 = __importDefault(require("../entity/User"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.Router();
// Follow a user
router.post('/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followedUser = yield User_1.default.findOne({ id: req.params.id });
        if (!followedUser) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Requested user doesnt exist');
        }
        const alreadyFollows = yield Follow_1.default.findOne({ where: { from: req.userId, to: req.params.id } });
        if (alreadyFollows) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('You already follow this user');
        }
        const follow = yield Follow_1.default.create({
            from: req.user,
            to: followedUser,
        });
        yield follow.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Unfollow a user
router.post('/unfollow/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followedUser = yield User_1.default.findOne({ id: req.params.id });
        if (!followedUser) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Requested user doesnt exist');
        }
        const alreadyFollows = yield Follow_1.default.findOne({ where: { from: req.userId, to: req.params.id } });
        if (!alreadyFollows) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('You do not follow this user');
        }
        yield typeorm_1.getManager()
            .getRepository(Follow_1.default)
            .createQueryBuilder('follow')
            .delete()
            .where('from = :from', { from: req.userId })
            .andWhere('to = :to', { to: req.params.id })
            .execute();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Check if you follow a user
router.get('/check/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followedUser = yield User_1.default.findOne({ id: req.params.id });
        if (!followedUser) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Requested user doesnt exist');
        }
        const alreadyFollows = yield Follow_1.default.findOne({ where: { from: req.userId, to: req.params.id } });
        if (!alreadyFollows) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ follows: false });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ follows: true });
    }
    catch (error) {
        next(error);
    }
}));
// Get follow counts
router.get('/count/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ where: { id: req.params.id }, relations: ['followers', 'following'] });
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Requested user doesnt exist');
        }
        const followers = user.followers;
        const following = user.following;
        res.status(http_status_codes_1.StatusCodes.OK).json({ followers, following });
    }
    catch (error) {
        next(error);
    }
}));
// Get follow users
router.get('/users/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield typeorm_1.getManager()
            .getRepository(User_1.default)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: req.params.id })
            .leftJoinAndSelect('user.followers', 'followers')
            .leftJoinAndSelect('followers.from', 'frfrom')
            .leftJoinAndSelect('followers.to', 'frto')
            .leftJoinAndSelect('user.following', 'following')
            .leftJoinAndSelect('following.from', 'fnfrom')
            .leftJoinAndSelect('following.to', 'fnto')
            .getOne();
        if (!user) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Requested user doesnt exist');
        }
        const followers = user.followers.map((follow) => follow.from);
        const following = user.following.map((follow) => follow.to);
        res.status(http_status_codes_1.StatusCodes.OK).json({ followers, following });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
