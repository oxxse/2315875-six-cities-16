import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offerPageData } from './mock/offers';
import { reviewsData } from './mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offerPageData} reviews={reviewsData} />
  </React.StrictMode>
);
