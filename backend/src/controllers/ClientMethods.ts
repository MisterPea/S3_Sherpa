import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { type Region, type s3ClientObjectType } from '../types';

dotenv.config();
const defaultRegion: Region = (process.env.AWS_REGION as Region) ?? 'us-east-1';

const newS3Client = (locale: Region): S3Client => new S3Client({
  region: locale,
  endpoint: 'http://localhost:4566',
  forcePathStyle: true
});

export const s3ClientObject: s3ClientObjectType = {
  newClient: (locale: Region = defaultRegion) => newS3Client(locale),
  defaultRegion
};
