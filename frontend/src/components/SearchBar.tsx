import * as React from 'react';
import { useState } from 'react';
import Svg from './Svg';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>('');
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => searchVal === '' && setIsFocused(false);
  const handleSearchChange = (e: React.BaseSyntheticEvent) => setSearchVal(e.target.value);

  return (
    <div className={`search-wrap${isFocused ? ' focused' : ''}`}>
      <input
        type="search"
        className="search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSearchChange}
        value={searchVal}
        tabIndex={0}
        placeholder={`${isFocused ? 'Search Bucket Names' : ''}`}
        style={{ textAlign: `${searchVal === '' ? 'center' : 'right'}` }}
      />
      <div className="search-placeholder">
        <div className="search-placeholder-inner">
          <p>SEARCH</p>
          <div className="search-placeholder-icon">
            <Svg.Magnifier />
          </div>
        </div>
      </div>
    </div>
  );
}
