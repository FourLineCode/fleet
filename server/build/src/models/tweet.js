"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reqString = {
    type: String,
    required: true,
};
const tweetSchema = new mongoose_1.Schema({
    body: reqString,
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
}, {
    timestamps: true,
});
const Tweet = mongoose_1.model('tweet', tweetSchema);
exports.default = Tweet;
//# sourceMappingURL=tweet.js.map