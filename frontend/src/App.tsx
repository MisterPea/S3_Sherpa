import * as React from 'react';
import './style/main.scss';
import { Route, Routes } from 'react-router-dom';
import BucketView from './components/mainPages/BucketView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BucketView />} />
    </Routes>
  );
}
