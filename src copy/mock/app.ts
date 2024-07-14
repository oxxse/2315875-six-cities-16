import { OfferPageProps } from './offer-page';
import { ReviewsProps } from './reviews';
import type { OfferPage } from '../types/offer';
import type { Review } from '../types/offer';

export const AppProps = {
  offers: OfferPageProps,
  reviews: ReviewsProps
};

export type AppPropsType = {
  offers: OfferPage;
  reviews: Review;
};
