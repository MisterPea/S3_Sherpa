import * as React from 'react';
import { useState, useRef } from 'react';
import { BucketCardProps } from 'types';
import ContextButton from './objectBarComponents/ContextButton';
import Svg from './Svg';
import BucketModal from './BucketModal';

export default function BucketCard({
  label,
  date,
  region,
  isPublic = false,
  activeState = false,
  toggleActiveState,
}: BucketCardProps) {

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalShown = useRef(false);

  // const localActiveState
  const toggleModal = () => {
    setModalOpen((s) => !s);
    modalShown.current = true;
    toggleActiveState();
  };

  // We're deferring the modal-close class, so it doesn't run on initial load, only after its' shown
  const modalState = () => {
    if (modalOpen === true) {
      return ' modal-open';
    }
    if (modalOpen === false && modalShown.current === true) {
      return ' modal-closed';
    }
    return '';
  };

  // Date formatting
  const dateObject = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const dateString = dateObject.toLocaleDateString('en-US', dateOptions);

  return (
    <div className={`bucket_card${activeState && !modalOpen ? ' not-active' : ''}`}>
      <div className={`bucket_card-modal${modalState()}`}>
        <BucketModal isDeletable />
      </div>
      <button
        type="button"
        className="bucket_card-main_button"
        disabled={activeState}
      >
        <h2>{label}</h2>
        <p>{`Created: ${dateString}`}</p>
        <div className="bucket_card-lower_area">
          <p className="region_text">{region}</p>
          {isPublic && (
            <div className="bucket_card-lower_area-is_public-wrap">
              <div className="bucket_card-lower_area-is_public-inner_wrap">
                <p className="bucket_public_text">BUCKET IS PUBLIC</p>
                <div className="bucket_card-lower_area-svg_wrap">
                  <Svg.Warn />
                </div>
              </div>
            </div>
          )}
        </div>
      </button>
      <div className="bucket_card-context_button">
        <ContextButton disabled={activeState && !modalOpen} action={toggleModal} />
      </div>
    </div>
  );
}
