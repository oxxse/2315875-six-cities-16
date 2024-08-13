import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import FeaturesList from '../../components/features-list/features-list';
import InsideList from '../../components/inside-list/inside-list';
import Host from '../../components/host/host';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found-page/not-found';
import type { OfferPage } from '../../types/types';
import type { Review } from '../../types/types';
import { Helmet } from 'react-helmet-async';
import { getAuthorizationStatus } from '../../utils/common';
import type { Offer } from '../../types/types';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { getMarkupRating } from '../../utils/common';
import ReviewsList from '../../components/reviews-list/review-list';
import { AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { useAppSelector } from '../../hooks';
import { selectOffers } from '../../store/selectors';


const authorizationStatus = getAuthorizationStatus();


type OfferPageData = {
  reviews: Review[];
};

function OfferPage({ reviews }: OfferPageData): JSX.Element {
  const { id } = useParams();
  const offers = useAppSelector(selectOffers);

  const currentOffer: Offer | undefined = offers.find((offer: Offer) => offer.id === id);
  const cityData = currentOffer?.city;


  const filteredOffers = offers.filter((offer) => offer.city.name === currentOffer?.city.name);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  if (!currentOffer) {
    return <NotFound />;
  }

  if (!cityData) {
    return <div>City information is missing</div>;
  }

  const MAX_NEARBY_OFFERS_COUNT = 3;
  const nearbyOffers = filteredOffers.filter((offer) => offer.id !== currentOffer.id).slice(0, MAX_NEARBY_OFFERS_COUNT);

  const { title, price, rating, isPremium, isFavorite, goods, description } = currentOffer;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <Header favorites={favoriteOffers} />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery sources={currentOffer} />
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <FavoriteButton className='offer' isFavorite={isFavorite} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={getMarkupRating(rating)}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <FeaturesList feature={currentOffer} />
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {goods.length > 1 ?
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <InsideList items={currentOffer} />
                </div> :
                ''}
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <Host hostData={currentOffer} />
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">{reviews.length}</span>
              </h2>
              <ReviewsList reviews={reviews} />
              {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
            </section>
          </div>
        </section>
        <Map city={currentOffer.location} offers={[...nearbyOffers, currentOffer]} className='offer' activeOffer={currentOffer} />
      </main>
      <div className="container">
        {nearbyOffers.length > 0 ?
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighborhood</h2>
            <PlaceCardList offers={nearbyOffers} classNameList="near-places__list" classNameItem='near-places__' imageWidth={260} imageHeight={200} />
          </section> : ''}
      </div>
    </div >
  );
}

export default OfferPage;
