import type { Meta, StoryObj } from '@storybook/react';
import UploadButton from '../components/objectBarComponents/UploadButton';

const meta: Meta<typeof UploadButton> = {
  title: 'Project/Object Bar/Object List Group',
  component: UploadButton,
};

const s3Objects = {
  $metadata: {
    httpStatusCode: 200,
    requestId: '9856d7c1-2911-4397-876f-a623c0103597',
    extendedRequestId: 's9lzHYrFp76ZVxRcpX9+5cjAnEH2ROuNkd2BHfIa6UkFVdtjf5mKR3/eTPFvsiP/XV/VLi31234=',
    attempts: 1,
    totalRetryDelay: 0,
  },
  IsTruncated: false,
  KeyCount: 18,
  MaxKeys: 1000,
  Name: 'logging-check',
  Prefix: '',
  Contents: [
    {
      Key: 'file1.txt',
      LastModified: '2024-06-01T12:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985328"', 
      Size: 14000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file2.jpg',
      LastModified: '2024-06-02T15:30:00Z',
      ETag: '"9b2cf535f27731c974343645a3985329"',
      Size: 1200000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file3.pdf',
      LastModified: '2024-06-03T08:20:00Z',
      ETag: '"9b2cf535f27731c974343645a3985330"',
      Size: 2500000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file4.docx',
      LastModified: '2024-06-04T09:45:00Z',
      ETag: '"9b2cf535f27731c974343645a3985331"',
      Size: 30000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file5.png',
      LastModified: '2024-06-05T10:15:00Z',
      ETag: '"9b2cf535f27731c974343645a3985332"',
      Size: 500000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file6.mp4',
      LastModified: '2024-06-06T11:30:00Z',
      ETag: '"9b2cf535f27731c974343645a3985333"',
      Size: 15000000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file7.csv',
      LastModified: '2024-06-07T12:45:00Z',
      ETag: '"9b2cf535f27731c974343645a3985334"',
      Size: 10000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file8.json',
      LastModified: '2024-06-08T14:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985335"',
      Size: 15000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file9.xml',
      LastModified: '2024-06-09T15:15:00Z',
      ETag: '"9b2cf535f27731c974343645a3985336"',
      Size: 12000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'file10.html',
      LastModified: '2024-06-10T16:30:00Z',
      ETag: '"9b2cf535f27731c974343645a3985337"',
      Size: 8000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder1/file1-1.txt',
      LastModified: '2024-06-11T17:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985338"',
      Size: 5000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder1/file1-2.csv',
      LastModified: '2024-06-11T18:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985339"',
      Size: 2000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder2/file2-1.pdf',
      LastModified: '2024-06-12T19:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985340"',
      Size: 1000000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder2/file2-2.docx',
      LastModified: '2024-06-12T20:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985341"',
      Size: 15000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder3/file3-1.jpg',
      LastModified: '2024-06-13T21:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985342"',
      Size: 250000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder3/file3-2.mp4',
      LastModified: '2024-06-13T22:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985343"',
      Size: 20000000,
      StorageClass: 'STANDARD',
    },
    {
      Key: 'folder4/file4-1.json',
      LastModified: '2024-06-14T23:00:00Z',
      ETag: '"9b2cf535f27731c974343645a3985344"',
      Size: 3500,
      StorageClass: 'STANDARD',
    },
  ],
};

export default meta;
type Story = StoryObj<typeof UploadButton>;

export const Primary: Story = {
  args: {
    disabled: false,
    action: () => { },
  },
};

