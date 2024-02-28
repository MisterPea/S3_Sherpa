import express, { type NextFunction, Router, type Response, type Request } from 'express';
import { createBucket, deleteBucket, deleteLifecycleConfig, getAclStatus, getBucketList, getBucketPolicy, getLifecycleConfig, getLoggingStatus, getVersionStatus, isBucketPublic, setBucketPolicy, setCannedAcl, setLifecycleConfig, toggleVersioning } from '../controllers/BucketMethods';
import { type MinimalBucketProps, type CreateBucketProps, type VersioningMessage, type SetCannedAclInput, type BucketPolicyInput, type LifecycleRouterProps } from '../types';
const jsonParser = express.json();

const router = Router();

router.get('/getBucketList', (_, res: Response, next: NextFunction) => {
  getBucketList()
    .then((data) => res.send(JSON.stringify(data)))
    .catch((err) => { next(err); });
});

router.post('/createBucket', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, acl, region }: CreateBucketProps = req.body;
  createBucket(bucketName, acl, region)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/deleteBucket', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  deleteBucket(region, bucketName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

// Versioning
router.get('/private/versioningStatus', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getVersionStatus(region, bucketName)
    .then((data: 'Enabled' | 'Suspended' | undefined) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/toggleVersioning', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  toggleVersioning(region, bucketName)
    .then((data: VersioningMessage) => res.send(data))
    .catch((err: any) => { next(err); });
});

// ACL
router.get('/private/getAclStatus', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getAclStatus(region, bucketName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/setCannedAcl', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, acl }: SetCannedAclInput = req.body;
  setCannedAcl(region, bucketName, acl)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/getLoggingStatus', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getLoggingStatus(region, bucketName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/isBucketPublic', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  isBucketPublic(region, bucketName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/getBucketPolicy', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getBucketPolicy(region, bucketName)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/setBucketPolicy', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, policyObject }: BucketPolicyInput = req.body;
  setBucketPolicy(region, bucketName, policyObject)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.get('/getLifecycleConfig', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  getLifecycleConfig(bucketName, region)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/deleteLifecycleConfig', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region }: MinimalBucketProps = req.body;
  deleteLifecycleConfig(bucketName, region)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

router.post('/setLifecycleConfig', jsonParser, (req: Request, res: Response, next: NextFunction) => {
  const { bucketName, region, config }: LifecycleRouterProps = req.body;
  setLifecycleConfig(bucketName, region, config)
    .then((data) => res.send(data))
    .catch((err: any) => { next(err); });
});

export default router;
