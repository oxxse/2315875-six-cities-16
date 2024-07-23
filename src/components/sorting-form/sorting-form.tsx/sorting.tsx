import { PLACES_OPTIONS } from '../../../const';
import { useState } from 'react';

type PlacesInsideProps = {
  placesOption: string;
}

type PlaceSortingProps = {
  width: number;
  height: number;
}

type PlaceOptionsProps = {
  className: string;
}

function PlacesOption({ placesOption }: PlacesInsideProps): JSX.Element {
  return (
    <li className="places__option" tabIndex={0}>{placesOption}</li>
  );
}

function PlacesOptionsList({ className }: PlaceOptionsProps): JSX.Element {

  return (
    <ul className={className}>
      {PLACES_OPTIONS.map((option) => <PlacesOption placesOption={option} key={option} />)}
    </ul>
  );
}

function PlaceSorting({ width, height }: PlaceSortingProps): JSX.Element {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <form onClick={toggleClass} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        Popular
        <svg className="places__sorting-arrow" width={width} height={height}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isActive ?
        <PlacesOptionsList className={'places__options places__options--custom places__options--opened'} /> :
        <PlacesOptionsList className={'places__options places__options--custom'} />}
    </form>
  );
}

export default PlaceSorting;
