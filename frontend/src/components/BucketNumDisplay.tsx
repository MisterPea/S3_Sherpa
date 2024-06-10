import * as React from 'react';
import Svg from './Svg';

export default function BucketNumDisplay({ numBuckets }: { numBuckets: number; }) {
  return (
    <div className="bucket_num_display">
      <Svg.Bucket />
      <p>{`BUCKETS (${numBuckets})`}</p>
    </div>
  );
}
