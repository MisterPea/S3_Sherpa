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
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveObjectsInBucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const ClientMethods_1 = require("./ClientMethods");
/**
 * Function for intra-bucket file moving (being that we're moving within the same bucket,
 * we shouldn't be governed by the 5gb cap on file copying, which would require a multipart upload)
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string[]} objectKeys Array of strings of the files to move
 * @param {string} destination New Destination of the files
 * @param {number} batchSize Max size of files to move at once
 */
function moveObjectsInBucket(locale, bucket, objectKeys, destination, batchSize = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < objectKeys.length; i += 1) {
            const batch = objectKeys.slice(i, i + batchSize);
            yield Promise.all(batch.map((sourceKey) => __awaiter(this, void 0, void 0, function* () {
                const destinationKey = `${destination}${sourceKey.split('/').pop()}`;
                yield moveFileWithinBucket(locale, bucket, sourceKey, destinationKey);
            })))
                .then(() => { console.log(`Batch ${Math.floor(i / batchSize) + 1} moved successfully.`); })
                .catch((error) => { console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error); });
        }
    });
}
exports.moveObjectsInBucket = moveObjectsInBucket;
function moveFileWithinBucket(locale, bucket, sourceKey, destinationKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        yield copyObjectWithinBucket(s3, bucket, sourceKey, destinationKey);
        yield deleteObject(s3, bucket, sourceKey);
    });
}
/* Create a copy of the file in another location */
function copyObjectWithinBucket(s3, bucket, sourceKey, destinationKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /* HeadObjectCommand is grabbing all the metadata without retrieving the actual object.
             We're doing this to retain the original metadata, and not reset it. */
            const headResult = yield s3.send(new client_s3_1.HeadObjectCommand({ Bucket: bucket, Key: sourceKey }));
            yield s3.send(new client_s3_1.CopyObjectCommand({
                Bucket: bucket,
                CopySource: `${bucket}/${sourceKey}`,
                Key: destinationKey,
                MetadataDirective: 'REPLACE',
                ContentType: headResult.ContentType,
                ContentLanguage: headResult.ContentLanguage,
                ContentEncoding: headResult.ContentEncoding,
                ContentDisposition: headResult.ContentDisposition,
                CacheControl: headResult.CacheControl,
                Metadata: headResult.Metadata
            }));
        }
        catch (err) {
            return err;
        }
    });
}
/* Delete the original version */
function deleteObject(s3, bucket, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteParams = {
            Bucket: bucket,
            Key: key
        };
        try {
            yield s3.send(new client_s3_1.DeleteObjectCommand(deleteParams));
        }
        catch (err) {
            return err;
        }
    });
}
