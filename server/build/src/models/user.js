"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reqString = {
    type: String,
    required: true,
};
const userSchema = new mongoose_1.Schema({
    username: Object.assign(Object.assign({}, reqString), { index: {
            // TODO: test if this works
            // @ts-ignore: idk wtf is happening
            unique: [true, 'Username already exists!'],
            collation: { locale: 'en', strength: 2 },
        } }),
    displayName: reqString,
    email: Object.assign(Object.assign({}, reqString), { unique: true }),
    password: reqString,
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const User = mongoose_1.model('user', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map