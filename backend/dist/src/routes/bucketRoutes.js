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
const BucketMethods_1 = require("../controllers/BucketMethods");
const jsonParser = express_1.default.json();
const router = (0, express_1.Router)();
router.get('/getBucketList', (_, res, next) => {
    (0, BucketMethods_1.getBucketList)()
        .then((data) => res.send(JSON.stringify(data)))
        .catch((err) => { next(err); });
});
router.post('/createBucket', jsonParser, (req, res, next) => {
    const { bucketName, acl, region } = req.body;
    (0, BucketMethods_1.createBucket)(bucketName, acl, region)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/deleteBucket', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.deleteBucket)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
// Versioning
router.get('/private/versioningStatus', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.getVersionStatus)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/toggleVersioning', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.toggleVersioning)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
// ACL
router.get('/private/getAclStatus', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.getAclStatus)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/setCannedAcl', jsonParser, (req, res, next) => {
    const { bucketName, region, acl } = req.body;
    (0, BucketMethods_1.setCannedAcl)(region, bucketName, acl)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/getLoggingStatus', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.getLoggingStatus)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/isBucketPublic', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.isBucketPublic)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/getBucketPolicy', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.getBucketPolicy)(region, bucketName)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/setBucketPolicy', jsonParser, (req, res, next) => {
    const { bucketName, region, policyObject } = req.body;
    (0, BucketMethods_1.setBucketPolicy)(region, bucketName, policyObject)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.get('/getLifecycleConfig', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.getLifecycleConfig)(bucketName, region)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/deleteLifecycleConfig', jsonParser, (req, res, next) => {
    const { bucketName, region } = req.body;
    (0, BucketMethods_1.deleteLifecycleConfig)(bucketName, region)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
router.post('/setLifecycleConfig', jsonParser, (req, res, next) => {
    const { bucketName, region, config } = req.body;
    (0, BucketMethods_1.setLifecycleConfig)(bucketName, region, config)
        .then((data) => res.send(data))
        .catch((err) => { next(err); });
});
exports.default = router;
