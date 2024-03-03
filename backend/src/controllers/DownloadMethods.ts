import { GetObjectCommand } from '@aws-sdk/client-s3';
import { type Region } from '../types';
import { s3ClientObject } from './ClientMethods';
import { Readable } from 'stream';
import { type Response } from 'express';
import archiver from 'archiver';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function streamSingleDownload (locale: Region, bucket: string, objectKey: string, res: Response): Promise<any> {
  const s3 = s3ClientObject.newClient(locale);

  try {
    const { Body, ContentType } = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: objectKey }));
    if (Body instanceof Readable && ContentType !== undefined) {
      res.setHeader('Content-Type', ContentType);
      res.setHeader('Content-Disposition', `attachment; filename="${objectKey}"`);
      (Body as NodeJS.ReadableStream).pipe(res);
    } else {
      console.error('Received body not a stream');
      throw new Error('Received body is not a stream');
    }
  } catch (err: any) {
    console.error('Error downloading file:', err);
    throw err; // Rethrow to be caught by Express error handling
  }
}

/**
 * Function set to zip and download multiple files
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} objectKeys Slugified Keys of objects to be zipped and downloaded
 * @param res Response body from express
 */
export async function zipAndDownloadFiles (locale: Region, bucket: string, objectKeys: string, res: Response): Promise<void> {
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="download.zip"');

  const archive = archiver('zip', {
    zlib: { level: 9 } // Compression level
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(res);

  for (const key of objectKeys.split(',')) {
    try {
      const fileStream = await _s3DownloadStreamService(locale, bucket, key);
      if (fileStream !== undefined) {
        archive.append(fileStream, { name: key });
      }
    } catch (error) {
      console.error(`Error fetching file ${key}:`, error);
    }
  }

  await archive.finalize();
}
/**
 * Companion function for `zipAndDownloadFiles` — Handles the streaming of files to be archived
 * @param {string} locale The region the bucket is located.
 * @param {string} bucket The name of the bucket.
 * @param {string} objectKey Key of the object to be streamed
 * @returns {Promise} returns Readable | undefined
 */
async function _s3DownloadStreamService (locale: Region, bucket: string, objectKey: string): Promise<Readable | undefined> {
  const s3 = s3ClientObject.newClient(locale);
  const { Body } = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: objectKey }));

  if (Body instanceof Readable || Body instanceof Blob) { // For Node.js environment, checking for Readable
    return Body as Readable;
  } else {
    throw new Error(`File stream is undefined for key: ${objectKey}`);
  }
}

export async function generateSignedUrlDownload (locale: Region, bucket: string, objectKey: string, expiresIn: number | undefined): Promise<string> {
  // expiresIn can be up to 7 days (e.g. 86400 for 24 hours)
  if (expiresIn === undefined) {
    expiresIn = 3600;
  }
  const s3 = s3ClientObject.newClient(locale);
  const command = new GetObjectCommand({ Bucket: bucket, Key: objectKey });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn });
    return signedUrl;
  } catch (err: any) {
    return err;
  }
}
