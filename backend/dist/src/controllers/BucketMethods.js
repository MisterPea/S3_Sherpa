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
exports.setLifecycleConfig = exports.deleteLifecycleConfig = exports.getLifecycleConfig = exports.setBucketPolicy = exports.getLoggingStatus = exports.getBucketPolicy = exports.isBucketPublic = exports.setCannedAcl = exports.getAclStatus = exports.toggleVersioning = exports.getVersionStatus = exports.deleteBucket = exports.createBucket = exports.getBucketList = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const ClientMethods_1 = require("./ClientMethods");
const createId_1 = __importDefault(require("../helpers/createId"));
// ** GET BUCKET FUNCTION ** //
/**
 * Function that retrieves all of the Buckets on the client's account
 * @returns {BucketType[]} BucketType is comprised of Name, CreationDate, Region
 */
function getBucketList() {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient();
        try {
            const { Buckets } = yield s3.send(new client_s3_1.ListBucketsCommand({}));
            const bucketWithRegion = yield pairBucketToRegion(s3, Buckets);
            return bucketWithRegion;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getBucketList = getBucketList;
/**
 * Convenience function to stitch bucket region to the name and creation date
 * @param {S3ClientType} client S3 Client
 * @param {Bucket[]} Buckets Buckets returned from ListBucketsCommand
 * @returns {Promise<BucketType[]>} Returns a promise that resolves to an array of BucketType objects
 */
function pairBucketToRegion(client, Buckets = []) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const collectBuckets = [];
        for (let i = 0; i < Buckets.length; i += 1) {
            try {
                const bucketName = (_a = Buckets[i].Name) !== null && _a !== void 0 ? _a : '';
                const region = (_b = (yield _getRegion(client, bucketName)).LocationConstraint) !== null && _b !== void 0 ? _b : ClientMethods_1.s3ClientObject.defaultRegion;
                const name = (_c = Buckets[i].Name) !== null && _c !== void 0 ? _c : '';
                const date = (_d = Buckets[i].CreationDate) !== null && _d !== void 0 ? _d : new Date();
                collectBuckets[i] = { Name: name, CreationDate: date, Region: region };
            }
            catch (err) {
                return err;
            }
        }
        return collectBuckets;
    });
}
/**
 * Private function that retrieves the region of a bucket
 * @param {S3ClientType} client S3 Client
 * @param {string} bucket Name of the bucket being queried
 * @returns {Promise<GetBucketLocationCommandOutput>}
 */
function _getRegion(client, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const region = yield client.send(new client_s3_1.GetBucketLocationCommand({ Bucket: bucket }));
            return region;
        }
        catch (err) {
            return err;
        }
    });
}
// ** CREATE BUCKET FUNCTION ** //
/**
 * Function to create a new S3 bucket
 * @param {string} bucketName Lowercase 3-63 characters a-z, 0-9, dots,hyphens.
 * @param {string} accessControlLevel Visibility of bucket defaults to private
 * @param {string} locale Region type of the bucket to be created
 * - Errors:
 * -- `BucketAlreadyExists: BucketAlreadyExists`
 * -- - Buckets must have a globally unique name
 * -- `InvalidBucketName: The specified bucket is not valid.`
 * -- - Buckets must follow the naming convention set forth here:
 * https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
 *  - Other options are available, and this function can be extended
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
 * @return {Promise}
 */
function createBucket(bucketName, accessControlLevel = 'private', locale = ClientMethods_1.s3ClientObject.defaultRegion) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const params = {
            Bucket: bucketName,
            ACL: accessControlLevel
        };
        try {
            yield s3.send(new client_s3_1.CreateBucketCommand(params));
            return { status: 200, message: 'Success' };
        }
        catch (err) {
            return err;
        }
    });
}
exports.createBucket = createBucket;
/**
 * Function to delete a bucket from s3 account
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The bucket to be deleted
 * @return {Promise} Object {status, message}
 */
function deleteBucket(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            yield s3.send(new client_s3_1.DeleteBucketCommand({ Bucket: bucket }));
            return { status: 204, message: 'No Content' };
        }
        catch (err) {
            return err;
        }
    });
}
exports.deleteBucket = deleteBucket;
/**
 * Function to retrieve the current versioning for the bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} Returns 'Enabled' | 'Suspended' | undefined
 */
function getVersionStatus(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const versionStatus = yield s3.send(new client_s3_1.GetBucketVersioningCommand({ Bucket: bucket }));
            return versionStatus.Status;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getVersionStatus = getVersionStatus;
/**
 * Function to toggle the Versioning status/policy
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} Object {status, newStatus:'Enabled'|'Suspended'}
 */
function toggleVersioning(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const Status = yield getVersionStatus(locale, bucket);
        let newStatus;
        if (Status === undefined || Status === 'Suspended') {
            newStatus = 'Enabled';
        }
        else {
            newStatus = 'Suspended';
        }
        try {
            yield s3.send(new client_s3_1.PutBucketVersioningCommand({ Bucket: bucket, VersioningConfiguration: { Status: newStatus } }));
            return { status: 200, newVersion: newStatus };
        }
        catch (err) {
            return err;
        }
    });
}
exports.toggleVersioning = toggleVersioning;
/**
 * Function to retrieve the current Acl status of a bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} AclStatus type of Grants and Owner
 */
function getAclStatus(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const aclStatus = yield s3.send(new client_s3_1.GetBucketAclCommand({ Bucket: bucket }));
            const Grants = aclStatus.Grants;
            const Owner = aclStatus.Owner;
            return { Grants, Owner };
        }
        catch (err) {
            return err;
        }
    });
}
exports.getAclStatus = getAclStatus;
/**
 * Function to set the acl via canned preset
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string} acl Predefined acl settings `public-read` | `public-read-write` | `authenticated-read` | `private`;`
 * @returns {Promise} Returns status and what the acl was set to
 */
function setCannedAcl(locale, bucket, acl) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            yield s3.send(new client_s3_1.PutBucketAclCommand({ Bucket: bucket, ACL: acl }));
            return { status: 200, acl };
        }
        catch (err) {
            return err;
        }
    });
}
exports.setCannedAcl = setCannedAcl;
/**
 * Function to determine if bucket is public
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
function isBucketPublic(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const bucketStatus = yield s3.send(new client_s3_1.GetBucketPolicyStatusCommand({ Bucket: bucket }));
            return bucketStatus;
        }
        catch (err) {
            return err;
        }
    });
}
exports.isBucketPublic = isBucketPublic;
/**
 * Function to retrieve the current bucket policy
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
function getBucketPolicy(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const bucketPolicy = yield s3.send(new client_s3_1.GetBucketPolicyCommand({ Bucket: bucket }));
            return bucketPolicy;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getBucketPolicy = getBucketPolicy;
/**
 * Function to ascertain the logging status of a bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
function getLoggingStatus(locale, bucket) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const loggingStatus = yield s3.send(new client_s3_1.GetBucketLoggingCommand({ Bucket: bucket }));
            return loggingStatus;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getLoggingStatus = getLoggingStatus;
/**
 * Function to set a bucket policy and or logging
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {Object} bucketPolicy Policy to apply to bucket
 * @returns {Promise}
 * ** NOTE: Read/Write for specific accounts - please validate all arns before passing here
 * ** If readWriteAccess is selected, they need to be accompanied by an array of arns
 * ** arns should look like: 'arn:aws:iam::ACCOUNT_ID_1:root', 'arn:aws:iam::ACCOUNT_ID_2:root'
 */
function setBucketPolicy(locale, bucket, bucketPolicy) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const principals = (_a = bucketPolicy.policyPayload) !== null && _a !== void 0 ? _a : [];
        const policyStatements = {
            publicRead: {
                Sid: 'PublicRead',
                Effect: 'Allow',
                Principal: '*',
                Action: 's3:GetObject',
                Resource: `arn:aws:s3:::${bucket}/*`
            },
            readWriteAccess: {
                Sid: 'ReadWriteAccess',
                Effect: 'Allow',
                Principal: {
                    AWS: principals
                },
                Action: ['s3:GetObject', 's3:PutObject'],
                Resource: `arn:aws:s3:::${bucket}/*`
            },
            denyDelete: {
                Sid: 'DenyDelete',
                Effect: 'Deny',
                Principal: '*',
                Action: 's3:DeleteObject',
                Resource: `arn:aws:s3:::${bucket}/*`
            }
        };
        const promisesArray = [];
        if (bucketPolicy.policy === 'publicRead' || bucketPolicy.policy === 'denyDelete' || bucketPolicy.policy === 'readWriteAccess') {
            const policy = {
                Version: '2012-10-17',
                Statement: policyStatements[bucketPolicy.policy]
            };
            const addPolicy = s3.send(new client_s3_1.PutBucketPolicyCommand({ Bucket: bucket, Policy: JSON.stringify(policy) }));
            promisesArray.push(addPolicy);
        }
        else if (bucketPolicy.policy === 'deletePolicy') {
            const deleteBucketPolicy = s3.send(new client_s3_1.DeleteBucketPolicyCommand({ Bucket: bucket }));
            promisesArray.push(deleteBucketPolicy);
        }
        if (bucketPolicy.toggleLogging === true) {
            try {
                const loggingStatus = yield _loggingToggleHelper(bucket, locale).getCurrentLogging();
                const command = { Bucket: bucket, BucketLoggingStatus: {} };
                if (loggingStatus === 'notLogging') {
                    const { logBucket } = yield _loggingToggleHelper(bucket, locale).createLogBucket();
                    command.BucketLoggingStatus = {
                        LoggingEnabled: {
                            TargetBucket: logBucket,
                            TargetPrefix: 'logs/' // A prefix for log files
                        }
                    };
                }
                const loggingResult = yield s3.send(new client_s3_1.PutBucketLoggingCommand(command));
                promisesArray.push(loggingResult);
            }
            catch (err) {
                return err;
            }
        }
        try {
            const results = yield Promise.allSettled(promisesArray);
            return results;
        }
        catch (err) {
            return err;
        }
    });
}
exports.setBucketPolicy = setBucketPolicy;
function _loggingToggleHelper(bucket, locale) {
    // Determine if the current bucket has logging attached
    const getCurrentLogging = () => __awaiter(this, void 0, void 0, function* () {
        const data = yield getLoggingStatus(locale, bucket);
        return data.LoggingEnabled === undefined ? 'notLogging' : 'isLogging';
    });
    // Create unique bucket name
    const createBucketName = () => bucket + '-log-' + (0, createId_1.default)(4);
    // Create new bucket with name and return it
    const createLogBucket = () => {
        const logBucketName = createBucketName();
        return createBucket(logBucketName, 'private', locale)
            .then((data) => { return Object.assign(Object.assign({}, data), { logBucket: logBucketName }); })
            .catch((err) => err);
    };
    return { getCurrentLogging, createLogBucket };
}
function getLifecycleConfig(bucket, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            const currentLifecycle = yield s3.send(new client_s3_1.GetBucketLifecycleConfigurationCommand({ Bucket: bucket }));
            return currentLifecycle;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getLifecycleConfig = getLifecycleConfig;
function deleteLifecycleConfig(bucket, locale) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        try {
            return yield s3.send(new client_s3_1.DeleteBucketLifecycleCommand({ Bucket: bucket }));
        }
        catch (err) {
            return err;
        }
    });
}
exports.deleteLifecycleConfig = deleteLifecycleConfig;
function setLifecycleConfig(bucket, locale, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const s3 = ClientMethods_1.s3ClientObject.newClient(locale);
        const lifecycleRule = constructLifecycleRule(config);
        const params = {
            Bucket: bucket,
            LifecycleConfiguration: {
                Rules: [lifecycleRule] // can add multiple rules here
            }
        };
        try {
            return yield s3.send(new client_s3_1.PutBucketLifecycleConfigurationCommand(params));
        }
        catch (err) {
            return err;
        }
        // get previous lifecycles (ID)
        // Folder validation
    });
}
exports.setLifecycleConfig = setLifecycleConfig;
function constructLifecycleRule(input) {
    const rule = {
        ID: input.ruleId,
        Filter: {
            Prefix: input.applyToFolderTarget
        },
        Status: 'Enabled'
    };
    // Set expiration for delete action
    if (input.actionType === 'delete') {
        rule.Expiration = {
            Days: input.expirationTrigger
        };
    }
    // Set transition if actionType is transition
    if (input.actionType === 'transition' && input.transitionOptions !== undefined) {
        rule.Transitions = [
            {
                Days: input.expirationTrigger,
                StorageClass: input.transitionOptions
            }
        ];
    }
    return rule;
}
