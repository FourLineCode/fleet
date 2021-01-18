"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Follow_1 = __importDefault(require("../entity/Follow"));
const Fleet_1 = __importDefault(require("./Fleet"));
const InternalEntity_1 = __importDefault(require("./InternalEntity"));
const Like_1 = __importDefault(require("./Like"));
const Reply_1 = __importDefault(require("./Reply"));
let User = class User extends InternalEntity_1.default {
};
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "displayName", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.OneToMany(() => Fleet_1.default, (fleet) => fleet.author),
    __metadata("design:type", Array)
], User.prototype, "fleets", void 0);
__decorate([
    typeorm_1.OneToMany(() => Follow_1.default, (follow) => follow.from),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    typeorm_1.OneToMany(() => Follow_1.default, (follow) => follow.to),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
__decorate([
    typeorm_1.OneToMany(() => Like_1.default, (likes) => likes.user),
    __metadata("design:type", Array)
], User.prototype, "likedFleets", void 0);
__decorate([
    typeorm_1.OneToMany(() => Reply_1.default, (replies) => replies.user),
    __metadata("design:type", Array)
], User.prototype, "replies", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.default = User;
