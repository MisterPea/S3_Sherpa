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
exports.updateStorageClass = exports.setObjectAcl = exports.getObjectAcl = exports.deleteFile = exports.deleteFolder = exports.addFolder = exports.getBucketContents = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const ClientMethods_1 = require("./ClientMethods");
/**
 * Function to retrieve all object names from bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} ListObjectsCommandOutput
 */
function getBucketContents(bucket, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const objectList = yield s3.send(new client_s3_1.ListObjectsV2Command({ Bucket: bucket }));
            return objectList;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getBucketContents = getBucketContents;
/**
 * Function to create an empty folder
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string} folderPath The path of the new folder e.g `one/two/three`
 * @param {string} folderName The name of the new folder e.g `four`
 * @returns {Promise}
 */
function addFolder(bucket, locale, folderPath = '', folderName) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const forwardSlash = (folderPath.length > 0 && folderPath !== '/') ? '/' : '';
        const validFolderPath = `${folderPath !== '/' ? folderPath : ''}`;
        const newFolderName = `${validFolderPath}${forwardSlash}${folderName}/`;
        try {
            return yield s3.send(new client_s3_1.PutObjectCommand({ Bucket: bucket, Key: newFolderName }));
        }
        catch (err) {
            return err;
        }
    });
}
exports.addFolder = addFolder;
/**
 * Method to delete a folder and it's contents
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} pathToDelete The uppermost level that deletion occurs.
 */
function deleteFolder(locale, bucket, pathToDelete) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const regExp = isPathDeletable(pathToDelete);
        /**
         * Closure to filter keys that need to be deleted from those that do not.
         * @param {Object[]} contents Derived from ListObjectsV2Command.
         * @return {Array{}} Return is an array of either objects with the key: Key,
         * or null. The null elements are filtered out post-return
         */
        function filterKeys(contents) {
            return contents
                .filter(({ Key }) => (Key !== undefined) && regExp.test(Key))
                // We can assert non-null because we've established that fact with filter
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                .map(({ Key }) => Key);
        }
        try {
            const objectArray = yield s3.send(new client_s3_1.ListObjectsV2Command({ Bucket: bucket }));
            const contents = (_a = objectArray.Contents) !== null && _a !== void 0 ? _a : [];
            const keysToDelete = filterKeys(contents).filter(Boolean).map((Key) => ({ Key }));
            if (keysToDelete.length > 0) {
                const toDelete = { Objects: keysToDelete };
                const deleteResponse = yield s3.send(new client_s3_1.DeleteObjectsCommand({ Bucket: bucket, Delete: toDelete }));
                return deleteResponse;
            }
            else {
                return 'No Matching Keys To Delete';
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.deleteFolder = deleteFolder;
/**
 * Function returns a regular expression object used to test
 * whether a path is to be deleted.
 * @param {string} pathToDelete Path to derive the regular expression
 * @return The return is new RegExp object
 */
function isPathDeletable(pathToDelete) {
    const pathArray = pathToDelete.split('/').filter(Boolean);
    return new RegExp(`^${pathArray.join('\\/')}\\/.*`);
}
/**
 * Method to delete one object from a bucket.
 * @param {string} locale Region of the bucket
 * @param {string} bucket Name of the bucket
 * @param {string} key Slash `/` delineated string representing the location of the object to delete
 * @return {Promise} Returns a Promise, showing success or failure
 */
function deleteFile(locale, bucket, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const filenameArray = key.split('/').filter(Boolean);
        const filename = filenameArray[filenameArray.length - 1];
        const keySplit = filenameArray.length === 1 ? filename : key;
        try {
            const deletionResult = yield s3.send(new client_s3_1.DeleteObjectCommand({ Bucket: bucket, Key: keySplit }));
            return deletionResult;
        }
        catch (err) {
            return err;
        }
    });
}
exports.deleteFile = deleteFile;
function getObjectAcl(locale, bucket, objectKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const objectAcl = yield s3.send(new client_s3_1.GetObjectAclCommand({ Bucket: bucket, Key: objectKey }));
            return objectAcl;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getObjectAcl = getObjectAcl;
function setObjectAcl(locale, bucket, objectKey, Acl) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const setAclResult = yield s3.send(new client_s3_1.PutObjectAclCommand({ Bucket: bucket, Key: objectKey, ACL: Acl }));
            return setAclResult;
        }
        catch (err) {
            return err;
        }
    });
}
exports.setObjectAcl = setObjectAcl;
function updateStorageClass(locale, bucket, objectKey, newStorageClass) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const copyParams = {
            Bucket: bucket,
            CopySource: encodeURIComponent(`${bucket}/${objectKey}`),
            Key: objectKey,
            StorageClass: newStorageClass,
            MetadataDirective: 'COPY'
        };
        try {
            const response = yield s3.send(new client_s3_1.CopyObjectCommand(copyParams));
            return response;
        }
        catch (err) {
            return err;
        }
    });
}
exports.updateStorageClass = updateStorageClass;
