import * as React from 'react';
import { BucketModalProps } from 'types';
import Svg from './Svg';

export default function BucketModal({ isDeletable }: BucketModalProps) {

  function handleACL() { }
  function handleBucketPolicy() { }
  function handleVersioning() { }
  function handleDelete() { }

  return (
    <div className="bucket_modal">
      <button type="button" className="bucket_modal-button">
        <div className="bucket_modal-svg_wrap">
          <Svg.Key />
        </div>
        <p className="bucket_modal-text">Access Control Level</p>
      </button>
      <button type="button" className="bucket_modal-button">
        <div className="bucket_modal-svg_wrap">
          <Svg.BucketPolicy />
        </div>
        <p className="bucket_modal-text">Bucket Policy</p>
      </button>
      <button type="button" className="bucket_modal-button">
        <div className="bucket_modal-svg_wrap">
          <Svg.Versioning />
        </div>
        <p className="bucket_modal-text">Versioning</p>
      </button>
      <button type="button" disabled={!isDeletable} className={`bucket_modal-button${!isDeletable ? ' not_deletable' : ''}`}>
        <div className="bucket_modal-svg_wrap">
          <Svg.Delete />
        </div>
        {isDeletable ? <p className="bucket_modal-text">Delete</p> : <p className="bucket_modal-text not_deletable">Empty To Delete</p>}
      </button>
    </div>
  );
}
