import express, { type Express } from 'express';
import dotenv from 'dotenv';
import { type KeyLike, type RsaPublicKey, privateDecrypt } from 'crypto';
import objectRoutes from './src/routes/objectRoutes';
import bucketRoutes from './src/routes/bucketRoutes';
// import { type ErrorResponse } from './src/types';
// import { ErrorHandler } from './src/types';
// import { getBucketList } from './src/controllers/BucketMethods';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

const convertBase64toBuffer = (base64: string): RsaPublicKey | KeyLike => Buffer.from(base64, 'base64').toString('ascii');

const getPrivateRsa = (): any => {
  if (process.env.RSA_PRIVATE !== undefined) {
    return convertBase64toBuffer(process.env.RSA_PRIVATE);
  } else {
    console.warn('PRIVATE_RSA not defined');
    return undefined;
  }
};

// const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): any => {
//   // return res.send({ name, httpStatus });
// };

/**
 * RSA Validation function.
 * @param {string} xApiData Base64 string of the public rsa key encoded with the originalUrl
 * @param {string} message String for comparison against the decoded data
 * @returns {boolean} is a valid call
 */
const isValidApiCall = (xApiData: string, message: string): boolean => {
  const encryptedData = Buffer.from(xApiData, 'base64');
  const rsaPrivate = getPrivateRsa();
  try {
    if (rsaPrivate !== undefined) {
      const decryptedData = privateDecrypt(
        rsaPrivate,
        encryptedData
      );
      return decryptedData.toString('utf-8') === message;
    }
  } catch (_) {
    // No reason to catch errors, any failures mean a tampered key
    return false;
  }
  return false;
};

app.use(express.json());

app.use('/', (req, res, next) => {
  const key = req.header('x-api-data') ?? '';
  if (!isValidApiCall(key, req.originalUrl)) {
    res.status(401).json({ error: `Cannot resolve:${req.originalUrl} - Invalid key` });
  } else {
    next();
  }
});

app.use('/bucket', bucketRoutes);
app.use('/objects', objectRoutes);
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server running at port:${port}`);
});
