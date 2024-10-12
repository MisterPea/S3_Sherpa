import * as React from 'react';
import MainTitle from './MainTitle';
import SearchBar from './SearchBar';

export default function BucketHeader() {

  return (
    <header className="bucket_header">
      <MainTitle />
      <SearchBar />
    </header>
  );
}
