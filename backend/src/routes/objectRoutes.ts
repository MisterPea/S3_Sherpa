import express, { Router, type Request, type Response, type NextFunction } from 'express';
import { type DeleteFolderProps, type AddFolderProps, type MinimalBucketProps, type SingleObjectProps } from '../types';
import { addFolder, deleteFolder, getBucketContents, deleteFile, getObjectAcl } from '../controllers/ObjectMethods';
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

export default router;
