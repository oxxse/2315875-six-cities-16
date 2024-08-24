import { PLACES_OPTIONS } from '../../../const';
import { useState } from 'react';
import { SortingOption } from '../../../types/types';

type PlaceSorting = {
  width: number;
  height: number;
  currentOption: string;
  onOptionClick: (option: SortingOption) => void;
}

type PlacesOptionsList = {
  onOptionClick: (option: SortingOption) => void;
  currentOption: string;
  isOpen: boolean;
}

type PlacesOption = {
  placesOption: SortingOption;
  isActive: boolean;
  onClick: (option: SortingOption) => void;
};

function PlacesOption({ placesOption, isActive, onClick }: PlacesOption): JSX.Element {
  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={() => onClick(placesOption)}
    >
      {placesOption}
    </li>
  );
}

function PlacesOptionsList({ currentOption, onOptionClick, isOpen }: PlacesOptionsList): JSX.Element {

  return (
    <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
      {PLACES_OPTIONS.map((option) => (
        <PlacesOption
          placesOption={option}
          key={option}
          isActive={option === currentOption}
          onClick={onOptionClick}
        />))}
    </ul>
  );
}

function PlaceSorting({ width, height, currentOption, onOptionClick }: PlaceSorting): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSet = (option: string) => {
    onOptionClick(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={toggleList}>
        {currentOption}
        <svg className="places__sorting-arrow" width={width} height={height}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <PlacesOptionsList
        currentOption={currentOption}
        onOptionClick={handleOptionSet}
        isOpen={isOpen}
      />
    </form>
  );
}

export default PlaceSorting;

