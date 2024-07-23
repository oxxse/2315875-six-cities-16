import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { OfferPageProps } from './mock/offer-page';
import { ReviewsProps } from './mock/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={OfferPageProps} reviews={ReviewsProps} />
  </React.StrictMode>
);
