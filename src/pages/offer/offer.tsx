import { useEffect } from 'react';
import './offer.css';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import FeaturesList from '../../components/features-list/features-list';
import InsideList from '../../components/inside-list/inside-list';
import Host from '../../components/host/host';
import Map from '../../components/map/map';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found/not-found';
import { Helmet } from 'react-helmet-async';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import { getMarkupRating } from '../../utils/common';
import ReviewsList from '../../components/reviews-list/review-list';
import { MAX_NEARBY_OFFERS_COUNT, MAX_IMAGES_COUNT } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import PlaceCardList from '../../components/place-card-list/place-card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOfferData, fetchOfferComments, fetchNearbyOffers } from '../../store/thunk-actions';
import { selectNearbyOffers, selectOfferDetails, selectOfferComments, selectOfferLoadingStatus, selectOfferLoadingError } from '../../store/offers/offers-selectors';
import { useAuthorization } from '../../hooks/use-authorization';
import Spinner from '../../components/spinner/spinner';

function OfferPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const isAuthorized = useAuthorization();

  useEffect(() => {
    if (id) {
      dispatch(getOfferData(id)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchOfferComments(id));
          dispatch(fetchNearbyOffers(id));
        }
      });
    }
  }, [id, dispatch]);

  const isLoading = useAppSelector(selectOfferLoadingStatus);
  const isError = useAppSelector(selectOfferLoadingError);
  const currentOffer = useAppSelector(selectOfferDetails);
  const reviews = useAppSelector(selectOfferComments);
  const nearOffers = useAppSelector(selectNearbyOffers);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFound />;
  }

  if (isError) {
    return (
      <main className="page__main page__main--offer">
        <h3>Произошла ошибка при загрузке данных.</h3>
      </main>
    );
  }

  const nearbyOffers = nearOffers.slice(0, MAX_NEARBY_OFFERS_COUNT);
  const { title, price, rating, isPremium, isFavorite, goods, description, images } = currentOffer;
  const imagesToShow = images.slice(0, MAX_IMAGES_COUNT);
  const offerId = id ?? 'defaultId';
  const offersToMark = [...nearbyOffers, currentOffer];

  return (
    <>
      <main className="page__main page__main--offer">
        <Helmet>
          <title>6 cities: Offer</title>
        </Helmet>
        <section className="offer">
          <div className="offer__gallery-container container">
            <OfferGallery images={imagesToShow} />
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
                <FavoriteButton offerId={offerId} isFavorite={isFavorite} width={31} height={33} buttonType="offer"/>
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
              {isAuthorized && id && <ReviewForm/>}
            </section>
          </div>
        </section>
        <Map className='offer' city={currentOffer.location} offers={offersToMark} activeOffer={currentOffer} />
      </main>
      <div className="container">
        {nearbyOffers &&
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighborhood</h2>
            <PlaceCardList offers={nearbyOffers} classNameList="near-places__list" classNameItem='near-places' imageWidth={260} imageHeight={200} />
          </section>}
      </div>
    </>
  );
}

export default OfferPage;
