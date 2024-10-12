"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3ClientObject = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const defaultRegion = (_a = process.env.AWS_REGION) !== null && _a !== void 0 ? _a : 'us-east-1';
const newS3Client = (locale) => new client_s3_1.S3Client({
    region: locale,
    endpoint: 'http://localhost:4566',
    forcePathStyle: true
});
exports.s3ClientObject = {
    newClient: (locale = defaultRegion) => newS3Client(locale),
    defaultRegion
};
