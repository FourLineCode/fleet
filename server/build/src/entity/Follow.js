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
const typeorm_1 = require("typeorm");
const InternalEntity_1 = __importDefault(require("./InternalEntity"));
const User_1 = __importDefault(require("./User"));
let Follow = class Follow extends InternalEntity_1.default {
};
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (from) => from.following, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.default)
], Follow.prototype, "from", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default, (to) => to.followers, { onDelete: 'CASCADE' }),
    __metadata("design:type", User_1.default)
], Follow.prototype, "to", void 0);
Follow = __decorate([
    typeorm_1.Entity()
], Follow);
exports.default = Follow;
