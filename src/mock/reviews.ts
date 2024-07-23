import { AVATAR_URL } from '../const.ts';
import { Review } from '../types/types.ts';

const allReviews = [
  {
    id: '1',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of the city.',
    rating: 4
  },
  {
    id: '2',
    date: '2020-06-10T15:30:40.569Z',
    user: {
      name: 'Max Black',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment: 'Great place with a stunning view, very close to the center. Highly recommended!',
    rating: 5
  },
  {
    id: '3',
    date: '2020-07-21T18:25:43.569Z',
    user: {
      name: 'Sophia Smith',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment: 'The apartment was a bit smaller than expected, but very clean and cozy.',
    rating: 3
  },
  {
    id: '4',
    date: '2021-02-11T12:34:56.569Z',
    user: {
      name: 'Ethan Hunt',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: true,
    },
    comment: 'Not too far from the city center, but the neighborhood was louder than we hoped.',
    rating: 3
  },
  {
    id: '5',
    date: '2021-03-15T09:20:30.569Z',
    user: {
      name: 'Amelia Earhart',
      avatarUrl: `${AVATAR_URL}?rnd=${Math.random()}`,
      isPro: false,
    },
    comment: 'Absolutely loved this place! The host was welcoming and the farmhouse style is charming.',
    rating: 5
  }
];

const getRandomReviews = (reviews: Review[]): Review[] => {
  const maxReviews = reviews.length;
  const randomCount = Math.floor(Math.random() * maxReviews) + 1;
  return reviews.slice(0, randomCount);
};

const reviewsData = getRandomReviews(allReviews);

export { reviewsData };
