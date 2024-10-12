import axios, { AxiosRequestConfig } from 'axios';
import generateKey from './generateKey';

const baseURL = 'http://localhost:5002';

export async function getBuckets(): Promise<any> {
  const url = '/bucket/getBucketList';
  const key = generateKey(url);
  const config: AxiosRequestConfig = {
    url: `${baseURL}${url}`,
    method: 'get',
    headers: {
      'x-api-data': key,
    },
  };
  try {
    const data = await axios(config);
    return data;
  } catch (err) {
    return err;
  }
}

export async function setBuckets() { }