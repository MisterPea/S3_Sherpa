import { type ListObjectsCommandOutput, ListObjectsV2Command, PutObjectCommand, type PutObjectCommandOutput, type _Object, DeleteObjectsCommand, DeleteObjectCommand, GetObjectAclCommand, type GetObjectAclCommandOutput } from '@aws-sdk/client-s3';
import { type Region } from '../types';
import { s3ClientObject } from './ClientMethods';

/**
 * Function to retrieve all object names from bucket
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @returns {Promise} ListObjectsCommandOutput
 */
export async function getBucketContents (bucket: string, locale: Region): Promise<ListObjectsCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const objectList = await s3.send(new ListObjectsV2Command({ Bucket: bucket }));
    return objectList;
  } catch (err: any) {
    return err;
  }
}

/**
 * Function to create an empty folder
 * @param {string} locale The region the bucket is located
 * @param {string} bucket The name of the bucket
 * @param {string} folderPath The path of the new folder e.g `one/two/three`
 * @param {string} folderName The name of the new folder e.g `four`
 * @returns {Promise}
 */
export async function addFolder (bucket: string, locale: Region, folderPath: string = '', folderName: string): Promise<PutObjectCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  const forwardSlash = (folderPath.length > 0 && folderPath !== '/') ? '/' : '';
  const validFolderPath = `${folderPath !== '/' ? folderPath : ''}`;
  const newFolderName = `${validFolderPath}${forwardSlash}${folderName}/`;

  try {
    return await s3.send(new PutObjectCommand({ Bucket: bucket, Key: newFolderName }));
  } catch (err: any) {
    return err;
  }
}

/**
 * Method to delete a folder and it's contents
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} pathToDelete The uppermost level that deletion occurs.
 */
export async function deleteFolder (locale: Region, bucket: string, pathToDelete: string): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);
  const regExp = isPathDeletable(pathToDelete);

  /**
   * Closure to filter keys that need to be deleted from those that do not.
   * @param {Object[]} contents Derived from ListObjectsV2Command.
   * @return {Array{}} Return is an array of either objects with the key: Key,
   * or null. The null elements are filtered out post-return
   */
  function filterKeys (contents: _Object[]): string[] {
    return contents
      .filter(({ Key }) => (Key !== undefined) && regExp.test(Key))
      // We can assert non-null because we've established that fact with filter
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map(({ Key }) => Key!);
  }

  try {
    const objectArray = await s3.send(new ListObjectsV2Command({ Bucket: bucket }));
    const contents = objectArray.Contents ?? [];
    const keysToDelete = filterKeys(contents).filter(Boolean).map((Key) => ({ Key }));

    if (keysToDelete.length > 0) {
      const toDelete = { Objects: keysToDelete };
      const deleteResponse = await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: toDelete }));
      return deleteResponse;
    } else {
      return 'No Matching Keys To Delete';
    }
  } catch (err: any) {
    return err;
  }
}

/**
 * Function returns a regular expression object used to test
 * whether a path is to be deleted.
 * @param {string} pathToDelete Path to derive the regular expression
 * @return The return is new RegExp object
 */
function isPathDeletable (pathToDelete: string): RegExp {
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
export async function deleteFile (locale: Region, bucket: string, key: string): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);

  const filenameArray = key.split('/').filter(Boolean);
  const filename = filenameArray[filenameArray.length - 1];
  const keySplit = filenameArray.length === 1 ? filename : key;

  try {
    const deletionResult = await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: keySplit }));
    return deletionResult;
  } catch (err: any) {
    return err;
  }
}

export async function getObjectAcl (locale: Region, bucket: string, objectKey: string): Promise<GetObjectAclCommandOutput> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const objectAcl = await s3.send(new GetObjectAclCommand({ Bucket: bucket, Key: objectKey }));
    return objectAcl;
  } catch (err: any) {
    return err;
  }
}

export async function setObjectAcl (locale: Region, bucket: string): Promise<void> {
  /// To come ///
}
