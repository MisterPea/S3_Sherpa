import { type ObjectCannedACL, type GetBucketAclCommandOutput, type S3Client, type StorageClass } from '@aws-sdk/client-s3';

export type S3ClientType = S3Client;

export type Region = 'us-east-2' | 'us-east-1' | 'us-west-1' | 'us-west-2' | 'af-south-1' | 'ap-east-1' | 'ap-south-1' | 'ap-northeast-3' | 'ap-northeast-2' | 'ap-southeast-1' | 'ap-southeast-2' | 'ap-northeast-1' | 'ca-central-1' | 'eu-central-1' | 'eu-west-1' | 'eu-west-2' | 'eu-south-1' | 'eu-west-3' | 'eu-north-1' | 'me-south-1' | 'sa-east-1';

export interface s3ClientObjectType {
  newClient: (locale?: Region) => S3Client
  defaultRegion: Region
};

export interface BucketType {
  Name: string
  CreationDate: Date
  Region?: string
};

export type AclType = 'public-read' | 'public-read-write' | 'authenticated-read' | 'private';

export interface CreateBucketProps {
  bucketName: string
  acl: AclType
  region: Region
}

export interface MinimalBucketProps {
  bucketName: string
  region: Region
}

export interface ReturnMessage {
  status: 200 | 204 | 400
  message: string
}

export interface VersioningMessage {
  status: 200 | 204 | 400
  newVersion: 'Enabled' | 'Suspended' | undefined
}

export interface AclStatus extends Omit<GetBucketAclCommandOutput, '$metadata'> {}

export interface SetCannedAclInput extends MinimalBucketProps {
  acl: AclType
}

export interface SetCannedAclOutput {
  status: 200 | 204 | 400
  acl: AclType
}

export interface ErrorResponse {
  name: string
  $fault: string
  $metadata: Metadata
  Code: string
  RequestId: string
  message: string
}

interface Metadata {
  httpStatusCode: number
  requestId: string
  extendedRequestId: string
  attempts: number
  totalRetryDelay: number
}

export interface BucketPolicy {
  policy: 'publicRead' | 'readWriteAccess' | 'denyDelete' | 'deletePolicy' | undefined
  policyPayload?: string[]
  toggleLogging?: boolean
}

export interface BucketPolicyInput extends MinimalBucketProps {
  policyObject: BucketPolicy
}

export interface NewLogBucket extends ReturnMessage {
  logBucket: string
}

export interface SetLifecycleConfigInput {
  ruleId: string
  applyToFolderTarget: string
  expirationTrigger: number
  actionType: 'delete' | 'transition'
  transitionOptions?: 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER_IR' | 'GLACIER' | 'DEEP_ARCHIVE'
}

interface TransitionsType {
  Days: number
  StorageClass: 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER_IR' | 'GLACIER' | 'DEEP_ARCHIVE'
};

export interface LifecycleRuleSet {
  ID: string
  Filter: {
    Prefix: string
  }
  Status: 'Enabled' | 'Disabled'
  Expiration?: {
    Days: number
  }
  Transitions?: TransitionsType[]
}

export interface LifecycleRouterProps extends MinimalBucketProps {
  config: SetLifecycleConfigInput
}

// Objects
export interface S3Object {
  Key: string
  LastModified: DateConstructor
  ETag: string
  Size: number
  StorageClass: 'STANDARD' | 'STANDARD_IA' | 'ONEZONE_IA' | 'INTELLIGENT_TIERING' | 'GLACIER_IR' | 'GLACIER' | 'DEEP_ARCHIVE'
};

export interface GetBucketContentsResult {
  Name: string
  KeyCount: number
  MaxKeys: number
  Prefix: string
  Contents: S3Object[]
}

export interface AddFolderProps extends MinimalBucketProps {
  folderPath: string
  folderName: string
}

export interface DeleteFolderProps extends MinimalBucketProps {
  pathToDelete: string
}

export interface SingleObjectProps extends MinimalBucketProps {
  objectKey: string
}

export interface MoveObjectProps extends MinimalBucketProps {
  objectKeys: string[]
  destination: string
  batchSize?: number
}

export interface SetObjectAclProps extends SingleObjectProps {
  Acl: ObjectCannedACL
}

export interface UpdateStorageClassProps extends SingleObjectProps {
  newStorageClass: StorageClass
}
