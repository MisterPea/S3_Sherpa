import express, { type Express } from 'express';
import dotenv from 'dotenv';
import { type KeyLike, type RsaPublicKey, privateDecrypt, constants } from 'crypto';
import objectRoutes from './src/routes/objectRoutes';
import bucketRoutes from './src/routes/bucketRoutes';
import NodeRSA, { type Key } from 'node-rsa';
import cors from 'cors';

// import { type ErrorResponse } from './src/types';
// import { ErrorHandler } from './src/types';
// import { getBucketList } from './src/controllers/BucketMethods';

dotenv.config();
const app: Express = express();
app.use(cors());

const port = process.env.PORT;

const getPrivateRsa = (): Key | undefined => {
  if (process.env.RSA_PRIVATE !== undefined) {
    return Buffer.from(process.env.RSA_PRIVATE, 'base64').toString('utf-8');
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
  const privateKeyPem = getPrivateRsa();
  if (privateKeyPem !== undefined) {
    try {
      const key = new NodeRSA(privateKeyPem, 'pkcs1', { encryptionScheme: 'pkcs1', environment: 'browser' });
      const encryptedData = Buffer.from(xApiData, 'base64');
      const decryptedData = key.decrypt(encryptedData, 'base64');
      const decryptedMessage = Buffer.from(decryptedData, 'base64').toString('utf-8');
      return decryptedMessage === message;
    } catch (_) {
      // Nothing to catch - errors indicate issue with key
      return false;
    }
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
