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
const auth_1 = __importDefault(require("../middlewares/auth"));
const tweet_1 = __importDefault(require("../models/tweet"));
const tweetSchema_1 = __importDefault(require("../validation/tweetSchema"));
const router = express_1.Router();
// Get all tweets
router.get('/', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweets = (yield tweet_1.default.find().populate('author', '_id username displayName isAdmin')) || [];
        res.status(http_status_codes_1.StatusCodes.OK).json(tweets.reverse());
    }
    catch (error) {
        next(error);
    }
}));
// Get one tweet
router.get('/post/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = yield tweet_1.default.findOne({ _id: req.params.id }).populate('author', '_id username displayName isAdmin');
        if (!tweet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Tweet not found');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json(tweet);
    }
    catch (error) {
        next(error);
    }
}));
// Post a tweet
router.post('/', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tweet = req.body;
        const { error } = yield tweetSchema_1.default.validate(tweet);
        if (error) {
            const [err] = error.details;
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw err;
        }
        const newTweet = yield tweet_1.default.create({
            body: tweet.body,
            author: req.userId,
        });
        const savedTweet = yield newTweet.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true, id: savedTweet._id });
    }
    catch (error) {
        next(error);
    }
}));
// Like a tweet
router.post('/like/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const tweet = yield tweet_1.default.findOne({ _id: id });
        if (!tweet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Tweet not found');
        }
        if ((_a = tweet.likes) === null || _a === void 0 ? void 0 : _a.includes(req.userId)) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('User already liked this tweet');
        }
        yield tweet.update({ likes: [...tweet.likes, req.userId] });
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
// Unlike a tweet
router.post('/unlike/:id', auth_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const id = req.params.id;
        const tweet = yield tweet_1.default.findOne({ _id: id });
        if (!tweet) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Tweet not found');
        }
        if (!((_b = tweet.likes) === null || _b === void 0 ? void 0 : _b.includes(req.userId))) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('User has not liked this tweet');
        }
        yield tweet.update({
            likes: (_c = tweet.likes) === null || _c === void 0 ? void 0 : _c.filter((user) => JSON.stringify(user) !== JSON.stringify(req.userId)),
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({ success: true });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=tweetRoutes.js.map