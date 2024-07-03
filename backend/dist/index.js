"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = require("crypto");
const objectRoutes_1 = __importDefault(require("./src/routes/objectRoutes"));
const bucketRoutes_1 = __importDefault(require("./src/routes/bucketRoutes"));
// import { type ErrorResponse } from './src/types';
// import { ErrorHandler } from './src/types';
// import { getBucketList } from './src/controllers/BucketMethods';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const convertBase64toBuffer = (base64) => Buffer.from(base64, 'base64').toString('ascii');
const getPrivateRsa = () => {
    if (process.env.RSA_PRIVATE !== undefined) {
        return convertBase64toBuffer(process.env.RSA_PRIVATE);
    }
    else {
        console.warn('PRIVATE_RSA not defined');
        return undefined;
    }
};
// const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {
//   // return res.send({ name, httpStatus });
// };
/**
 * RSA Validation function.
 * @param {string} xApiData Base64 string of the public rsa key encoded with the originalUrl
 * @param {string} message String for comparison against the decoded data
 * @returns {boolean} is a valid call
 */
const isValidApiCall = (xApiData, message) => {
    const encryptedData = Buffer.from(xApiData, 'base64');
    const rsaPrivate = getPrivateRsa();
    try {
        if (rsaPrivate !== undefined) {
            const decryptedData = (0, crypto_1.privateDecrypt)(rsaPrivate, encryptedData);
            return decryptedData.toString('utf-8') === message;
        }
    }
    catch (_) {
        // No reason to catch errors, any failures mean a tampered key
        return false;
    }
    return false;
};
app.use(express_1.default.json());
app.use('/', (req, res, next) => {
    var _a;
    const key = (_a = req.header('x-api-data')) !== null && _a !== void 0 ? _a : '';
    if (!isValidApiCall(key, req.originalUrl)) {
        res.status(401).json({ error: `Cannot resolve:${req.originalUrl} - Invalid key` });
    }
    else {
        next();
    }
});
app.use('/bucket', bucketRoutes_1.default);
app.use('/objects', objectRoutes_1.default);
// app.use(errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server running at port:${port}`);
});
