import { CopyObjectCommand, type DeleteObjectCommandInput, type S3Client, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { s3ClientObject } from './ClientMethods';
import { type Region } from '../types';

/**
 * Function for intra-bucket file moving (being that we're moving within the same bucket,
 * we shouldn't be governed by the 5gb cap on file copying, which would require a multipart upload)
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string[]} objectKeys Array of strings of the files to move
 * @param {string} destination New Destination of the files
 * @param {number} batchSize Max size of files to move at once
 */
export async function moveObjectsInBucket
 (locale: Region, bucket: string, objectKeys: string[], destination: string, batchSize: number = 10): Promise<any> {
  for (let i = 0; i < objectKeys.length; i += 1) {
    const batch = objectKeys.slice(i, i + batchSize);
    await Promise.all(batch.map(async (sourceKey) => {
      const destinationKey = `${destination}${sourceKey.split('/').pop()}`;
      await moveFileWithinBucket(locale, bucket, sourceKey, destinationKey);
    }))
      .then(() => { console.log(`Batch ${Math.floor(i / batchSize) + 1} moved successfully.`); })
      .catch((error) => { console.error(`Error in batch ${Math.floor(i / batchSize) + 1}:`, error); });
  }
}

async function moveFileWithinBucket (locale: Region, bucket: string, sourceKey: string, destinationKey: string): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);
  await copyObjectWithinBucket(s3, bucket, sourceKey, destinationKey);
  await deleteObject(s3, bucket, sourceKey);
}

/* Create a copy of the file in another location */
async function copyObjectWithinBucket (s3: S3Client, bucket: string, sourceKey: string, destinationKey: string): Promise<any> {
  try {
    /* HeadObjectCommand is grabbing all the metadata without retrieving the actual object.
     We're doing this to retain the original metadata, and not reset it. */
    const headResult = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: sourceKey }));
    await s3.send(new CopyObjectCommand({
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
  } catch (err: any) {
    return err;
  }
}

/* Delete the original version */
async function deleteObject (s3: S3Client, bucket: string, key: string): Promise<any> {
  const deleteParams: DeleteObjectCommandInput = {
    Bucket: bucket,
    Key: key
  };

  try {
    await s3.send(new DeleteObjectCommand(deleteParams));
  } catch (err: any) {
    return err;
  }
}
