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
const Fleet_1 = __importDefault(require("../entity/Fleet"));
const Follow_1 = __importDefault(require("../entity/Follow"));
const Like_1 = __importDefault(require("../entity/Like"));
const Reply_1 = __importDefault(require("../entity/Reply"));
const User_1 = __importDefault(require("../entity/User"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const fleetSchema_1 = __importDefault(require("../validation/fleetSchema"));
const replySchema_1 = __importDefault(require("../validation/replySchema"));
const router = express_1.Router();
// Get all fleets
router.get('/', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleets = (yield typeorm_1.getManager()
            .getRepository(Fleet_1.default)
            .createQueryBuilder('fleet')
            .leftJoinAndSelect('fleet.author', 'author')
            .leftJoinAndSelect('fleet.likes', 'likes')
            .leftJoinAndSelect('fleet.replies', 'replies')
            .select([
            'fleet',
            'likes',
            'replies',
            'author.id',
            'author.username',
            'author.displayName',
            'author.isAdmin',
        ])
            .getMany()) || [];
        res.status(http_status_codes_1.StatusCodes.OK).json(fleets.reverse());
    }
    catch (error) {
        next(error);
    }
}));
// Get home page fleets for user
router.get('/home', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleets = (yield typeorm_1.getManager()
            .getRepository(Fleet_1.default)
            .createQueryBuilder('fleet')
            .leftJoinAndSelect('fleet.author', 'author')
            .leftJoinAndSelect('fleet.likes', 'likes')
            .leftJoinAndSelect('fleet.replies', 'replies')
            .select([
            'fleet',
            'likes',
            'replies',
            'author.id',
            'author.username',
            'author.displayName',
            'author.isAdmin',
        ])
            .getMany()) || [];
        const followedUsers = yield typeorm_1.getManager()
            .getRepository(Follow_1.default)
            .createQueryBuilder('follow')
            .leftJoinAndSelect('follow.from', 'from')
            .where('from.id = :id', { id: req.userId })
            .leftJoinAndSelect('follow.to', 'to')
            .getMany();
        const followedUserIds = followedUsers.map((follow) => String(follow.to.id));
        followedUserIds.push(String(req.userId));
        const filteredFleets = fleets.filter((fleet) => followedUserIds.includes(String(fleet.author.id)));
        res.status(http_status_codes_1.StatusCodes.OK).json(filteredFleets.reverse());
    }
    catch (error) {
        next(error);
    }
}));
// Get one fleet
router.get('/post/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield typeorm_1.getManager()
            .getRepository(Fleet_1.default)
            .createQueryBuilder('fleet')
            .where('fleet.id = :id', { id: req.params.id })
            .leftJoinAndSelect('fleet.author', 'author')
            .leftJoinAndSelect('fleet.likes', 'likes')
            .leftJoinAndSelect('fleet.replies', 'replies')
            .leftJoinAndSelect('replies.user', 'user')
            .orderBy('replies.createdAt', 'ASC')
            .select([
            'fleet',
            'likes',
            'replies',
            'user.id',
            'user.username',
            'user.displayName',
            'user.isAdmin',
            'author.id',
            'author.username',
            'author.displayName',
            'author.isAdmin',
        ])
            .getOne();
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(fleet);
    }
    catch (error) {
        next(error);
    }
}));
// Get fleets for one user by id
router.get('/timeline/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield typeorm_1.getManager()
            .getRepository(User_1.default)
            .createQueryBuilder('user')
            .where('user.id = :id', { id: req.params.id })
            .leftJoinAndSelect('user.fleets', 'fleets')
            .leftJoinAndSelect('fleets.author', 'author')
            .leftJoinAndSelect('fleets.likes', 'likes')
            .leftJoinAndSelect('fleets.replies', 'replies')
            .select([
            'user',
            'fleets',
            'likes',
            'replies',
            'author.id',
            'author.username',
            'author.displayName',
            'author.bio',
            'author.isAdmin',
        ])
            .getOne();
        const fleets = (user === null || user === void 0 ? void 0 : user.fleets) || [];
        res.status(http_status_codes_1.StatusCodes.OK).json(fleets.reverse());
    }
    catch (error) {
        next(error);
    }
}));
// Post a fleet
router.post('/', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = req.body;
        const { error } = fleetSchema_1.default.validate(fleet);
        if (error) {
            const [err] = error.details;
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw err;
        }
        const newFleet = yield Fleet_1.default.create({
            body: fleet.body,
            author: req.user,
        });
        const savedFleet = yield newFleet.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, id: savedFleet.id });
    }
    catch (error) {
        next(error);
    }
}));
// delete a fleet
router.delete('/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield typeorm_1.getManager()
            .getRepository(Fleet_1.default)
            .createQueryBuilder('fleet')
            .where('fleet.id = :id', { id: req.params.id })
            .leftJoinAndSelect('fleet.author', 'author')
            .select(['fleet', 'author.id', 'author.username', 'author.displayName', 'author.isAdmin'])
            .getOne();
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        if (fleet.author.id !== req.userId && !req.admin) {
            res.status(http_status_codes_1.StatusCodes.FORBIDDEN);
            throw new Error('You are not authorized to delete this fleet');
        }
        yield typeorm_1.getManager()
            .getRepository(Fleet_1.default)
            .createQueryBuilder('fleet')
            .delete()
            .where('fleet.id = :id', { id: fleet.id })
            .execute();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Like a fleet
router.post('/like/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield Fleet_1.default.findOne({ id: req.params.id });
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        const like = yield Like_1.default.findOne({ where: { user: req.user, fleet: fleet } });
        if (like) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('User already liked this fleet');
        }
        yield Like_1.default.create({
            user: req.user,
            fleet: fleet,
        }).save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Unlike a fleet
router.post('/unlike/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield Fleet_1.default.findOne({ id: req.params.id });
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        const like = yield Like_1.default.findOne({ where: { user: req.user, fleet: fleet } });
        if (!like) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('User has not liked this fleet');
        }
        yield Like_1.default.delete({ user: req.user, fleet: fleet });
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Check if user likes a fleet
router.get('/checklike/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield Fleet_1.default.findOne({ id: req.params.id });
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        const like = yield Like_1.default.findOne({ where: { user: req.user, fleet: fleet } });
        if (!like) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ liked: false });
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ liked: true });
    }
    catch (error) {
        next(error);
    }
}));
// Reply to a fleet
router.post('/reply/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fleet = yield Fleet_1.default.findOne({ id: req.params.id });
        if (!fleet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Fleet not found');
        }
        const { error } = replySchema_1.default.validate(req.body);
        if (error) {
            const [err] = error.details;
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw err;
        }
        const reply = Reply_1.default.create({ fleet: fleet, user: req.user, body: req.body.body });
        yield reply.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, reply: reply });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
