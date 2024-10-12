import JSEncrypt from 'jsencrypt';

export default function generateKey(encodingString: string) {
  const publicKey = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEbGJZYUs4a0x2MDN0RDQvY2hPdHQ4VDhCSAp4Q3Q5SklBQTMvQjVEQ095TnYxMVNIYytNMU8xTlpVU2dUcFpTZ1BqejRVQmVFTjU5MUpuUlJ2azRHaHhSczFMCncxU3BwbFlxYnpDMHNnVmtLc00xcHZlMHE3Sm8xTDdrcC9KdC9RVmFWdHhDTUxkS0xOTW5nU3IrV2sxRWdpWGQKQ0VucVAwWGJidFRNMjJna1l3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ==';
  const encrypt = new JSEncrypt();
  const pem = atob(publicKey);
  encrypt.setPublicKey(pem);
  return encrypt.encrypt(encodingString);
}
