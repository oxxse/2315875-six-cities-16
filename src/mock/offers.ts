import { getRandomArrayElement, getRandomInteger, getRandomBoolean, createIdGenerator, getRandomRating, generateHotelLocation } from '../utils/common.ts';
import { Offer, User } from '../types/types.ts';
import { City } from '../types/types.ts';
import { AVATAR_URL, TYPES } from '../const.ts';

const MAX_PRICE_VALUE = 200;

const MAX_BEDROOMS = 5;
const OFFER_COUNT = 8;
const MAX_OFFER_IMAGE_COUNT = 6;
const MAX_PHOTO_COUNT = 20;

const TITLES = ['Beautiful luxurious apartment at great location', 'Wood and stone place', 'Canal View Prinsengracht', 'Nice, cozy, warm big bed apartment'];
const OFFER_INSIDE_ITEMS = ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'];

const DESCRIPTIONS = [
  ' providing a unique combination of historical charm and modern comfort. Situated in a picturesque area that captivates with its tranquility and the beauty of nature.',
  ' in the heart of the city with all amenities for a comfortable stay. Ideal for both short visits and longer stays.',
  ' located in a serene neighborhood, offering peace and tranquility away from the hustle and bustle of the city center.',
  ' with a lovely view of the surroundings, perfect for solo travelers or couples looking for a romantic getaway.',
  ' in a historic building, blending classic architecture with modern comforts for an unforgettable experience.'
];

const CITY_LOCATIONS: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.89797,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.55034,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

const HOSTS: User[] = [
  {
    name: 'Alice Johnson',
    avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
    isPro: getRandomBoolean(),
  },
  {
    name: 'Mike Brown',
    avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
    isPro: getRandomBoolean(),
  },
  {
    name: 'Liam Smith',
    avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
    isPro: getRandomBoolean(),
  },
  {
    name: 'Sophia Wilson',
    avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
    isPro: getRandomBoolean(),
  },
  {
    name: 'Ethan Hunt',
    avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
    isPro: getRandomBoolean(),
  }
];

const offersId = createIdGenerator();

const getRandomGoods = (items: string[]): string[] => {
  const maxGoods = items.length;
  const randomCount = Math.floor(Math.random() * maxGoods) + 1;
  return items.slice(0, randomCount);
};

const getRandomMockOffers = (): Offer => {

  const offerId = offersId().toString();

  const randomType = getRandomArrayElement(TYPES);

  const randomTitle = getRandomArrayElement(TITLES);

  const randomCity = getRandomArrayElement(CITY_LOCATIONS);

  const hotelLocation = generateHotelLocation(randomCity.location);

  const randomRating = getRandomRating();

  const randomBedroomsNumber = getRandomInteger(MAX_BEDROOMS);

  const randomGoods = getRandomGoods(OFFER_INSIDE_ITEMS);

  const randomDescription = getRandomArrayElement(DESCRIPTIONS);

  const randomHost = getRandomArrayElement(HOSTS);

  const randomImages: string[] = [];
  for (let i = 0; i < MAX_OFFER_IMAGE_COUNT; i++) {
    randomImages.push(`https://15.design.htmlacademy.pro/static/hotel/${getRandomInteger(MAX_PHOTO_COUNT)}.jpg`);
  }

  return {
    id: offerId,
    title: randomTitle,
    type: randomType,
    price: getRandomInteger(MAX_PRICE_VALUE),
    previewImage: `https://15.design.htmlacademy.pro/static/hotel/${getRandomInteger(MAX_PHOTO_COUNT)}.jpg`,
    city: randomCity,
    location: hotelLocation,
    isFavorite: getRandomBoolean(),
    isPremium: getRandomBoolean(),
    rating: randomRating,
    bedrooms: randomBedroomsNumber,
    maxAdults: randomBedroomsNumber * 2,
    goods: randomGoods,
    description: randomType + randomDescription,
    host: randomHost,
    images: randomImages,
  };
};

const offerPageProps = Array.from({ length: getRandomInteger(OFFER_COUNT) }, getRandomMockOffers);

export { offerPageProps };
