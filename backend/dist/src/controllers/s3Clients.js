"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newClient = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
// const region = 'us-east-1';
const newClient = (locale) => new client_s3_1.S3Client({
    region: locale,
    endpoint: encodeURI('http://localhost:4566'),
    forcePathStyle: true
});
exports.newClient = newClient;
