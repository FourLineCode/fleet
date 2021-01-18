"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const http_status_codes_1 = require("http-status-codes");
const notFound = (req, res, next) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode !== http_status_codes_1.StatusCodes.OK
        ? res.statusCode
        : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    });
};
exports.errorHandler = errorHandler;
