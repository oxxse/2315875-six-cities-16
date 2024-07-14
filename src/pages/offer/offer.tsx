import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import FeaturesList from '../../components/features-list/features-list';
import InsideList from '../../components/inside-list/inside-list';
import Host from '../../components/host/host';
import ReviewItem from '../../components/reviews/review';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import CardItem from '../../components/card-item/card-item';
import { NearPlaceCard } from '../../mock/near-place-card';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found-page/not-found';
import type { OfferPage } from '../../types/offer';
import type { Review } from '../../types/offer';


function Offer({ hotels, comments }: { hotels: OfferPage; comments: Review }): JSX.Element {
  const params = useParams();
  const hotel = hotels.find((offer) => offer.id === params.id);

  if (typeof hotel !== 'undefined') {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <OfferGallery sources={hotel} />
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{hotel.title}</h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: '80%' }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{hotel.rating}</span>
                </div>
                <FeaturesList feature={hotel} />
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{hotel.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <InsideList items={hotel} />
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <Host hostData={hotel} />
                  <div className="offer__description">
                    <p className="offer__text">{hotel.description}</p>
                    <p className="offer__text">
                      An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                  <ul className="reviews__list">
                    {comments.map((comment) => <ReviewItem reviewData={comment} key={crypto.randomUUID()} />)}
                  </ul>
                  <ReviewForm />
                </section>
              </div>
            </div>
            <Map />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                {NearPlaceCard.map((offer) => <CardItem className='near-places__card' place={offer} key={crypto.randomUUID()} />)}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <NotFound />
    );
  }
}

export default Offer;

