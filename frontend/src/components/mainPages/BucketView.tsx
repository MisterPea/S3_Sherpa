import * as React from 'react';
import { useEffect, useState } from 'react';
import BucketHeader from '../BucketHeader';
import BucketNumDisplay from '../BucketNumDisplay';
import Button from '../Button';
import { getBuckets } from '../services/bucketData';
import BucketCard from '../BucketCard';

export default function BucketView() {
  const [bucketList, setBucketList] = useState([]);
  const [cardHasActiveState, setCardHasActiveState] = useState(false);

  async function populateState() {
    const buckets = await getBuckets();
    setBucketList(buckets.data);
  }

  function handleCreateBucket() {

  }

  function toggleCardIsActive() {
    setCardHasActiveState((s) => !s);
  }

  useEffect(() => {
    populateState();
  }, []);

  return (
    <div className="bucket_view-main">
      <BucketHeader />
      <div className="bucket_view-bucket_methods">
        <BucketNumDisplay numBuckets={bucketList.length} />
        <Button label="Create Bucket" type="primary" width="content" plusIcon action={() => handleCreateBucket()} />
      </div>
      <div className="bucket_view-bucket_wrap">
        {bucketList.length === 0 ? (<h3>There Are No Buckets In Your Account</h3>
        ) : (
          <ul>
            {bucketList.map(({ Name, CreationDate, Region }) => (
              <li key={Name + Region}>
                <BucketCard
                  label={Name}
                  date={CreationDate}
                  region={Region}
                  isPublic={false}
                  activeState={cardHasActiveState}
                  toggleActiveState={() => toggleCardIsActive()}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

