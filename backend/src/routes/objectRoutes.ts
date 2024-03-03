import express, { Router, type Request, type Response, type NextFunction } from 'express';
import { type DeleteFolderProps, type AddFolderProps, type MinimalBucketProps, type SingleObjectProps, type MoveObjectProps, type Region, type SetObjectAclProps, type UpdateStorageClassProps } from '../types';
import { addFolder, deleteFolder, getBucketContents, deleteFile, getObjectAcl, setObjectAcl, updateStorageClass } from '../controllers/ObjectMethods';
import { moveObjectsInBucket } from '../controllers/UploadAndCopyMethods';
import { generateSignedUrlDownload, streamSingleDownload, zipAndDownloadFiles } from '../controllers/DownloadMethods';
const jsonParser = express.json();

const router = Router();

router.get('/getBucketContents', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getBucketContents(bucketName, region)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/addFolderToBucket', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, folderName, folderPath }: AddFolderProps = req.body;
  addFolder(bucketName, region, folderPath, folderName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/deleteFolder', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, pathToDelete }: DeleteFolderProps = req.body;
  deleteFolder(region, bucketName, pathToDelete)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/deleteFile', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, objectKey }: SingleObjectProps = req.body;
  deleteFile(region, bucketName, objectKey)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/getObjectAcl', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, objectKey }: SingleObjectProps = req.body;
  getObjectAcl(region, bucketName, objectKey)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/setObjectAcl', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, objectKey, Acl }: SetObjectAclProps = req.body;
  setObjectAcl(region, bucketName, objectKey, Acl)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/moveObjects', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, objectKeys, destination, batchSize }: MoveObjectProps = req.body;
  moveObjectsInBucket(region, bucketName, objectKeys, destination, batchSize)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/downloadFile', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const bucketName = req.query.bucketName as string;
  const region = req.query.region as Region;
  const objectKey = req.query.objectKey as string;
  streamSingleDownload(region, bucketName, objectKey, res).catch((err: any) => { next(err); });
});

router.get('/downloadFiles', (req: Request, res: Response, next: NextFunction) => {
  const bucketName = req.query.bucketName as string;
  const region = req.query.region as Region;
  const objectKeys = req.query.objectKeys as string;
  zipAndDownloadFiles(region, bucketName, objectKeys, res).catch((err: any) => { next(err); });
});

router.get('/downloadViaSignedUrl', (req: Request, res: Response, next: NextFunction) => {
  const bucketName = req.query.bucketName as string;
  const region = req.query.region as Region;
  const objectKey = req.query.objectKey as string;
  const expiresIn = req.query.expiresIn as number | undefined;
  generateSignedUrlDownload(region, bucketName, objectKey, expiresIn)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/updateStorageClass', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { region, bucketName, objectKey, newStorageClass }: UpdateStorageClassProps = req.body;
  updateStorageClass(region, bucketName, objectKey, newStorageClass)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

export default router;
