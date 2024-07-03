"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const crypto_1 = require("crypto");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../.env' });
const pubEnvKey = process.env.RSA_PUBLIC;
const privateEnvKey = process.env.RSA_PRIVATE;
const { privateKey, publicKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});
const toBase64 = (key) => Buffer.from(key).toString('base64');
const toBuffer = (key) => Buffer.from(key, 'base64').toString('ascii');
const privateBase64 = toBase64(privateKey);
const publicBase64 = toBase64(publicKey);
const encryptedData = (0, crypto_1.publicEncrypt)(toBuffer(pubEnvKey), Buffer.from('/objects/updateStorageClass'));
const encryptedBase64 = encryptedData.toString('base64');
const decryptedData = (0, crypto_1.privateDecrypt)(toBuffer(privateEnvKey), Buffer.from(encryptedBase64, 'base64'));
const printPublicBase64 = () => { console.log(publicBase64, '\n'); };
const printPrivateBase64 = () => { console.log(privateBase64, '\n'); };
const printPublicKey = () => { console.log(publicKey, '\n'); };
const printPrivateKey = () => { console.log(privateKey, '\n'); };
const printDecodedKey = () => { console.log(toBuffer(pubEnvKey)); };
const printEncryptedData = () => { console.log(encryptedData); };
const printEncryptedDataBase64 = () => { console.log(encryptedBase64); };
const printDecryptedData = () => { console.log(decryptedData.toString('utf-8')); };
const args = process.argv.slice(2); // Remove the first two elements
// Usage: npx ts-node generateKeyPair.ts printEncryptedBase64
switch (args[0]) {
    case 'printPublicBase64':
        printPublicBase64();
        break;
    case 'printPrivateBase64':
        printPrivateBase64();
        break;
    case 'printPublicKey':
        printPublicKey();
        break;
    case 'printPrivateKey':
        printPrivateKey();
        break;
    case 'printDecodedKey':
        printDecodedKey();
        break;
    case 'printEncryptedData':
        printEncryptedData();
        break;
    case 'printEncryptedBase64':
        printEncryptedDataBase64();
        break;
    case 'printDecryptedData':
        printDecryptedData();
        break;
    default:
        console.log('Invalid argument. Please use one of the specific function names as an argument.');
}
