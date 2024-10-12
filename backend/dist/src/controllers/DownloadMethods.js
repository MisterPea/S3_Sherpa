"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignedUrlDownload = exports.zipAndDownloadFiles = exports.streamSingleDownload = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const ClientMethods_1 = require("./ClientMethods");
const stream_1 = require("stream");
const archiver_1 = __importDefault(require("archiver"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
function streamSingleDownload(locale, bucket, objectKey, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const { Body, ContentType } = yield s3.send(new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: objectKey }));
            if (Body instanceof stream_1.Readable && ContentType !== undefined) {
                res.setHeader('Content-Type', ContentType);
                res.setHeader('Content-Disposition', `attachment; filename="${objectKey}"`);
                Body.pipe(res);
            }
            else {
                console.error('Received body not a stream');
                throw new Error('Received body is not a stream');
            }
        }
        catch (err) {
            console.error('Error downloading file:', err);
            throw err; // Rethrow to be caught by Express error handling
        }
    });
}
exports.streamSingleDownload = streamSingleDownload;
/**
 * Function set to zip and download multiple files
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} objectKeys Slugified Keys of objects to be zipped and downloaded
 * @param res Response body from express
 */
function zipAndDownloadFiles(locale, bucket, objectKeys, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="download.zip"');
        const archive = (0, archiver_1.default)('zip', {
            zlib: { level: 9 } // Compression level
        });
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(res);
        for (const key of objectKeys.split(',')) {
            try {
                const fileStream = yield _s3DownloadStreamService(locale, bucket, key);
                if (fileStream !== undefined) {
                    archive.append(fileStream, { name: key });
                }
            }
            catch (error) {
                console.error(`Error fetching file ${key}:`, error);
            }
        }
        yield archive.finalize();
    });
}
exports.zipAndDownloadFiles = zipAndDownloadFiles;
/**
 * Companion function for `zipAndDownloadFiles` — Handles the streaming of files to be archived
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} objectKey Key of the object to be streamed
 * @returns {Promise} returns Readable | undefined
 */
function _s3DownloadStreamService(locale, bucket, objectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const { Body } = yield s3.send(new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: objectKey }));
        if (Body instanceof stream_1.Readable || Body instanceof Blob) { // For Node.js environment, checking for Readable
            return Body;
        }
        else {
            throw new Error(`File stream is undefined for key: ${objectKey}`);
        }
    });
}
function generateSignedUrlDownload(locale, bucket, objectKey, expiresIn) {
    return __awaiter(this, void 0, void 0, function* () {
        // expiresIn can be up to 7 days (e.g. 86400 for 24 hours)
        if (expiresIn === undefined) {
            expiresIn = 3600;
        }
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const command = new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: objectKey });
        try {
            const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn });
            return signedUrl;
        }
        catch (err) {
            return err;
        }
    });
}
exports.generateSignedUrlDownload = generateSignedUrlDownload;
