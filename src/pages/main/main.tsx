import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PlaceSorting from '../../components/sorting-form/sorting-form.tsx/sorting';
import CardItem from '../../components/card-item/card-item';
import { PlaceCard } from '../../mock/place-card';
import Map from '../../components/map/map';

type OffersProps = {
  offersCount: number;
}

export function MainPage({ offersCount }: OffersProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <PlaceSorting />
              <div className="cities__places-list places__list tabs__content">
                {PlaceCard.map((offer) => <CardItem className='cities__card' place={offer} key={crypto.randomUUID()} />)}
              </div>
            </section>
            <div className="cities__right-section">
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>);
}

export default MainPage;
