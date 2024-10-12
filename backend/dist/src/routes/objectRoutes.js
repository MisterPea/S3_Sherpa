"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const ObjectMethods_1 = require("../controllers/ObjectMethods");
const UploadAndCopyMethods_1 = require("../controllers/UploadAndCopyMethods");
const DownloadMethods_1 = require("../controllers/DownloadMethods");
const jsonParser = express_1.default.json();
const router = (0, express_1.Router)();
router.get('/getBucketContents', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, ObjectMethods_1.getBucketContents)(bucketName, region)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/addFolderToBucket', jsonParser, (req, res, next) => {
    const { bucketName, region, folderName, folderPath } = req.body;
    (0, ObjectMethods_1.addFolder)(bucketName, region, folderPath, folderName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/deleteFolder', jsonParser, (req, res, next) => {
    const { bucketName, region, pathToDelete } = req.body;
    (0, ObjectMethods_1.deleteFolder)(region, bucketName, pathToDelete)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/deleteFile', jsonParser, (req, res, next) => {
    const { bucketName, region, objectKey } = req.body;
    (0, ObjectMethods_1.deleteFile)(region, bucketName, objectKey)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/getObjectAcl', jsonParser, (req, res, next) => {
    const { bucketName, region, objectKey } = req.body;
    (0, ObjectMethods_1.getObjectAcl)(region, bucketName, objectKey)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/setObjectAcl', jsonParser, (req, res, next) => {
    const { bucketName, region, objectKey, Acl } = req.body;
    (0, ObjectMethods_1.setObjectAcl)(region, bucketName, objectKey, Acl)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/moveObjects', jsonParser, (req, res, next) => {
    const { bucketName, region, objectKeys, destination, batchSize } = req.body;
    (0, UploadAndCopyMethods_1.moveObjectsInBucket)(region, bucketName, objectKeys, destination, batchSize)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/downloadFile', jsonParser, (req, res, next) => {
    const bucketName = req.query.bucketName;
    const region = req.query.region;
    const objectKey = req.query.objectKey;
    (0, DownloadMethods_1.streamSingleDownload)(region, bucketName, objectKey, res).catch((err) => { next(err); });
});
router.get('/downloadFiles', (req, res, next) => {
    const bucketName = req.query.bucketName;
    const region = req.query.region;
    const objectKeys = req.query.objectKeys;
    (0, DownloadMethods_1.zipAndDownloadFiles)(region, bucketName, objectKeys, res).catch((err) => { next(err); });
});
router.get('/downloadViaSignedUrl', (req, res, next) => {
    const bucketName = req.query.bucketName;
    const region = req.query.region;
    const objectKey = req.query.objectKey;
    const expiresIn = req.query.expiresIn;
    (0, DownloadMethods_1.generateSignedUrlDownload)(region, bucketName, objectKey, expiresIn)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/updateStorageClass', jsonParser, (req, res, next) => {
    const { region, bucketName, objectKey, newStorageClass } = req.body;
    (0, ObjectMethods_1.updateStorageClass)(region, bucketName, objectKey, newStorageClass)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
exports.default = router;
