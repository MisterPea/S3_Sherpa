import {
  ListBucketsCommand,
  GetBucketLocationCommand,
  DeleteBucketCommand,
  GetBucketVersioningCommand,
  type GetBucketLocationCommandOutput,
  type Bucket,
  type CreateBucketRequest,
  CreateBucketCommand,
  PutBucketVersioningCommand,
  GetBucketAclCommand,
  PutBucketAclCommand,
  GetBucketPolicyStatusCommand,
  GetBucketPolicyCommand,
  type GetBucketPolicyCommandOutput,
  type GetBucketPolicyStatusCommandOutput,
  PutBucketPolicyCommand,
  DeleteBucketPolicyCommand,
  GetBucketLoggingCommand,
  type GetBucketLoggingCommandOutput,
  type PutBucketLoggingCommandInput,
  PutBucketLoggingCommand,
  GetBucketLifecycleConfigurationCommand,
  type GetBucketLifecycleConfigurationCommandOutput,
  DeleteBucketLifecycleCommand,
  type DeleteBucketLifecycleCommandOutput,
  PutBucketLifecycleConfigurationCommand
} from '@aws-sdk/client-s3';
import { s3ClientObject } from './ClientMethods';
import { type S3ClientType, type BucketType, type AclType, type Region, type ReturnMessage, type VersioningMessage, type AclStatus, type SetCannedAclOutput, type BucketPolicy, type NewLogBucket, type SetLifecycleConfigInput, type LifecycleRuleSet } from '../types';
import createId from '../helpers/createId';

// ** GET BUCKET FUNCTION ** //
/**
 * Function that retrieves all of the Buckets on the client's account
 * @returns {BucketType[]} BucketType is comprised of Name, CreationDate, Region
 */
export async function getBucketList (): Promise<BucketType[] | undefined> {
  const s3 = s3ClientObject.newClient();
  try {
    const { Buckets } = await s3.send(new ListBucketsCommand({}));
    const bucketWithRegion = await pairBucketToRegion(s3, Buckets);
    return bucketWithRegion;
  } catch (err: any) {
    return err;
  }
}

/**
 * Convenience function to stitch bucket region to the name and creation date
 * @param {S3ClientType} client S3 Client
 * @param {Bucket[]} Buckets Buckets returned from ListBucketsCommand
 * @returns {Promise<BucketType[]>} Returns a promise that resolves to an array of BucketType objects
 */
async function pairBucketToRegion (client: S3ClientType, Buckets: Bucket[] = []): Promise<BucketType[]> {
  const collectBuckets: BucketType[] = [];
  for (let i = 0; i < Buckets.length; i += 1) {
    try {
      const bucketName = Buckets[i].Name ?? '';
      const region = (await _getRegion(client, bucketName)).LocationConstraint ?? s3ClientObject.defaultRegion;
      const name: string = Buckets[i].Name ?? '';
      const date: Date = Buckets[i].CreationDate ?? new Date();
      collectBuckets[i] = { Name: name, CreationDate: date, Region: region };
    } catch (err: any) {
      return err;
    }
  }
  return collectBuckets;
}

/**
 * Private function that retrieves the region of a bucket
 * @param {S3ClientType} client S3 Client
 * @param {string} bucket Name of the bucket being queried
 * @returns {Promise<GetBucketLocationCommandOutput>}
 */
async function _getRegion (client: S3ClientType, bucket: string): Promise<GetBucketLocationCommandOutput> {
  try {
    const region = await client.send(new GetBucketLocationCommand({ Bucket: bucket }));
    return region;
  } catch (err: any) {
    return err;
  }
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
export async function createBucket (bucketName: string, accessControlLevel: AclType = 'private', locale: Region = s3ClientObject.defaultRegion): Promise<ReturnMessage> {
  const s3 = s3ClientObject.newClient(locale);

  const params: CreateBucketRequest = {
    Bucket: bucketName,
    ACL: accessControlLevel
  };
  try {
    await s3.send(new CreateBucketCommand(params));
    return { status: 200, message: 'Success' };
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to delete a bucket from s3 account
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The bucket to be deleted
 * @return {Promise} Object {status, message}
 */
export async function deleteBucket (locale: Region, bucket: string): Promise<ReturnMessage> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    await s3.send(new DeleteBucketCommand({ Bucket: bucket }));
    return { status: 204, message: 'No Content' };
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to retrieve the current versioning for the bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} Returns 'Enabled' | 'Suspended' | undefined
 */
export async function getVersionStatus (locale: Region, bucket: string): Promise<'Enabled' | 'Suspended' | undefined> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const versionStatus = await s3.send(new GetBucketVersioningCommand({ Bucket: bucket }));
    return versionStatus.Status;
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to toggle the Versioning status/policy
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} Object {status, newStatus:'Enabled'|'Suspended'}
 */
export async function toggleVersioning (locale: Region, bucket: string): Promise<VersioningMessage> {
  const s3 = s3ClientObject.newClient(locale);
  const Status = await getVersionStatus(locale, bucket);

  let newStatus: 'Enabled' | 'Suspended';
  if (Status === undefined || Status === 'Suspended') {
    newStatus = 'Enabled';
  } else {
    newStatus = 'Suspended';
  }

  try {
    await s3.send(new PutBucketVersioningCommand({ Bucket: bucket, VersioningConfiguration: { Status: newStatus } }));
    return { status: 200, newVersion: newStatus };
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to retrieve the current Acl status of a bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} AclStatus type of Grants and Owner
 */
export async function getAclStatus (locale: Region, bucket: string): Promise<AclStatus> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const aclStatus = await s3.send(new GetBucketAclCommand({ Bucket: bucket }));
    const Grants = aclStatus.Grants;
    const Owner = aclStatus.Owner;
    return { Grants, Owner };
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to set the acl via canned preset
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string} acl Predefined acl settings `public-read` | `public-read-write` | `authenticated-read` | `private`;`
 * @returns {Promise} Returns status and what the acl was set to
 */
export async function setCannedAcl (locale: Region, bucket: string, acl: AclType): Promise<SetCannedAclOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    await s3.send(new PutBucketAclCommand({ Bucket: bucket, ACL: acl }));
    return { status: 200, acl };
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to determine if bucket is public
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
export async function isBucketPublic (locale: Region, bucket: string): Promise<GetBucketPolicyStatusCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const bucketStatus = await s3.send(new GetBucketPolicyStatusCommand({ Bucket: bucket }));
    return bucketStatus;
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to retrieve the current bucket policy
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
export async function getBucketPolicy (locale: Region, bucket: string): Promise<GetBucketPolicyCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const bucketPolicy = await s3.send(new GetBucketPolicyCommand({ Bucket: bucket }));
    return bucketPolicy;
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to ascertain the logging status of a bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise}
 */
export async function getLoggingStatus (locale: Region, bucket: string): Promise<GetBucketLoggingCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const loggingStatus = await s3.send(new GetBucketLoggingCommand({ Bucket: bucket }));
    return loggingStatus;
  } catch (err: any) {
    return err;
  }
}

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
export async function setBucketPolicy (locale: Region, bucket: string, bucketPolicy: BucketPolicy): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);

  const principals = bucketPolicy.policyPayload ?? [];

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
    const addPolicy = s3.send(new PutBucketPolicyCommand({ Bucket: bucket, Policy: JSON.stringify(policy) }));
    promisesArray.push(addPolicy);
  } else if (bucketPolicy.policy === 'deletePolicy') {
    const deleteBucketPolicy = s3.send(new DeleteBucketPolicyCommand({ Bucket: bucket }));
    promisesArray.push(deleteBucketPolicy);
  }

  if (bucketPolicy.toggleLogging === true) {
    try {
      const loggingStatus: 'isLogging' | 'notLogging' = await _loggingToggleHelper(bucket, locale).getCurrentLogging();
      const command: PutBucketLoggingCommandInput = { Bucket: bucket, BucketLoggingStatus: {} };
      if (loggingStatus === 'notLogging') {
        const { logBucket } = await _loggingToggleHelper(bucket, locale).createLogBucket();
        command.BucketLoggingStatus = {
          LoggingEnabled: {
            TargetBucket: logBucket,
            TargetPrefix: 'logs/' // A prefix for log files
          }
        };
      }

      const loggingResult = await s3.send(new PutBucketLoggingCommand(command));
      promisesArray.push(loggingResult);
    } catch (err: any) {
      return err;
    }
  }

  try {
    const results = await Promise.allSettled(promisesArray);
    return results;
  } catch (err: any) {
    return err;
  }
}

function _loggingToggleHelper (bucket: string, locale: Region): any {
  // Determine if the current bucket has logging attached
  const getCurrentLogging = async (): Promise<'isLogging' | 'notLogging'> => {
    const data: GetBucketLoggingCommandOutput = await getLoggingStatus(locale, bucket);
    return data.LoggingEnabled === undefined ? 'notLogging' : 'isLogging';
  };

  // Create unique bucket name
  const createBucketName = (): string => bucket + '-log-' + createId(4);

  // Create new bucket with name and return it
  const createLogBucket = (): any => {
    const logBucketName = createBucketName();
    return createBucket(logBucketName, 'private', locale)
      .then((data): NewLogBucket => { return { ...data, logBucket: logBucketName }; })
      .catch((err: any) => err);
  };
  return { getCurrentLogging, createLogBucket };
}

export async function getLifecycleConfig (bucket: string, locale: Region): Promise<GetBucketLifecycleConfigurationCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const currentLifecycle = await s3.send(new GetBucketLifecycleConfigurationCommand({ Bucket: bucket }));
    return currentLifecycle;
  } catch (err: any) {
    return err;
  }
}

export async function deleteLifecycleConfig (bucket: string, locale: Region): Promise<DeleteBucketLifecycleCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    return await s3.send(new DeleteBucketLifecycleCommand({ Bucket: bucket }));
  } catch (err: any) {
    return err;
  }
}

export async function setLifecycleConfig (bucket: string, locale: Region, config: SetLifecycleConfigInput): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);

  const lifecycleRule = constructLifecycleRule(config);

  const params = {
    Bucket: bucket,
    LifecycleConfiguration: {
      Rules: [lifecycleRule] // can add multiple rules here
    }
  };

  try {
    return await s3.send(new PutBucketLifecycleConfigurationCommand(params));
  } catch (err: any) {
    return err;
  }

  // get previous lifecycles (ID)

  // Folder validation
}

function constructLifecycleRule (input: SetLifecycleConfigInput): LifecycleRuleSet {
  const rule: LifecycleRuleSet = {
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
