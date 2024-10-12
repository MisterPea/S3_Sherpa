"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const objectRoutes_1 = __importDefault(require("./src/routes/objectRoutes"));
const bucketRoutes_1 = __importDefault(require("./src/routes/bucketRoutes"));
const node_rsa_1 = __importDefault(require("node-rsa"));
// import { type ErrorResponse } from './src/types';
// import { ErrorHandler } from './src/types';
// import { getBucketList } from './src/controllers/BucketMethods';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const convertBase64toBuffer = (base64) => Buffer.from(base64, 'base64').toString('ascii');
// const getPrivateRsa = (): any => {
//   if (process.env.RSA_PRIVATE !== undefined) {
//     return convertBase64toBuffer(process.env.RSA_PRIVATE);
//   } else {
//     console.warn('PRIVATE_RSA not defined');
//     return undefined;
//   }
// };
const getPrivateRsa = () => {
    if (process.env.RSA_PRIVATE_1 !== undefined) {
        return process.env.RSA_PRIVATE_1;
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
    // const privateKeyB64 = getPrivateRsa();
    // const privateKeyPem = `-----BEGIN PRIVATE KEY-----\n${privateKeyB64.match(/.{1,64}/g).join('\n')}\n-----END PRIVATE KEY-----`;
    const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDlbYaK8kLv03tD4/chOtt8T8BHxCt9JIAA3/B5DCOyNv11SHc+
M1O1NZUSgTpZSgPjz4UBeEN591JnRRvk4GhxRs1Lw1SpplYqbzC0sgVkKsM1pve0
q7Jo1L7kp/Jt/QVaVtxCMLdKLNMngSr+Wk1EgiXdCEnqP0XbbtTM22gkYwIDAQAB
AoGACMQOh/CJrjAeXZGwN4zQJgfGCPft0XI7kcz8myNjmcOQG5MRO0cqw5mwgGx/
ljnFvEaJhmzZ5ycT9u4lCrGoS9kpHvaoXTR2fORp9/AcmiW7vcZzVl7ey3EseAWf
+0d2dDkjZV6uIBj14E7AYnDqOVZlCXPK3vx9/V/UJmCZlcECQQD6fp7P0I6QrET9
OB6VVMQ7H9YCH1laqWPWojspHol6nXabFzCLAE4xqVa9Yhe/3M8oexwUQMjYOaJi
2EOuuqv3AkEA6nhgF5Ju1X2XcufIm9EcBE0i5VhF016pZFuEeeuE33fe3ikBE8XU
0NcULTjUehCI6pmX+VGjgypLQ3J+38y39QJBAMP5ljQN/cuwC1V0t3CrXc7H7H3C
mvy0M5jzWYelDXfxg554uRC2z3ZI/sSx3tTLYwNPtbseqEOKa8IbYnBsOScCQQC1
FJ5x1f+PFd2/Ok7uN8MBd2k54sCai4MbJKrdVg1aYMNYpCZW1PSVDWZhvoAqfVag
iFqcjHZRuHpD7ssZoIt5AkBjpYV9Ero4Mpnh4983jfWbZNxRQ94gQByMqmrqnMZO
xmLJF5RAv2M07gY+SbUPhr/6ZXxH0VqRcI3SNSuwHQmJ
-----END RSA PRIVATE KEY-----`;
    const key = new node_rsa_1.default(privateKeyPem, 'pkcs1');
    // key.importKey(privateKeyPem, 'pkcs1-private');
    const encryptedData = Buffer.from(xApiData, 'base64');
    // console.error(xApiData)
    const decryptedData = key.decrypt(encryptedData, 'base64');
    console.log("***", decryptedData);
    return true;
    // const rsaPrivate = getPrivateRsa();
    // try {
    //   if (rsaPrivate !== undefined) {
    //     const decryptedData = privateDecrypt({
    //       key: rsaPrivate,
    //       padding: constants.RSA_PKCS1_PADDING
    //     }, encryptedData
    //       // rsaPrivate,
    //       // encryptedData
    //     );
    //     console.log("****", decryptedData.toString('utf-8'));
    //     return decryptedData.toString('utf-8') === message;
    //   }
    // } catch (err) {
    //   console.error(err);
    //   // No reason to catch errors, any failures mean a tampered key
    //   return '0';
    // }
    // return '2';
};
app.use(express_1.default.json());
app.use('/', (req, res, next) => {
    var _a;
    const key = (_a = req.header('x-api-data')) !== null && _a !== void 0 ? _a : '';
    console.warn("**", isValidApiCall(key, req.originalUrl));
    res.status(666).json({ slip: isValidApiCall(key, req.originalUrl) });
    // if (!isValidApiCall(key, req.originalUrl)) {
    //   res.status(401).json({ error: `Cannot resolve:${req.originalUrl} - Invalid key` });
    // } else {
    //   next();
    // }
});
app.use('/bucket', bucketRoutes_1.default);
app.use('/objects', objectRoutes_1.default);
// app.use(errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server running at port:${port}`);
});
