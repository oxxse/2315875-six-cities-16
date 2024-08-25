import { memo } from 'react';
import { Review } from '../../types/types.ts';
import ReviewItem from '../reviews/review.tsx';
import { MAX_REVIEWS_COUNT } from '../../const.ts';
import { compareDates, formatDate } from '../../utils/common.ts';

type ReviewsList = {
  reviews: Review[];
}

const ReviewsList = memo(({ reviews }: ReviewsList): JSX.Element => {
  const sortedReviews = [...reviews].sort(compareDates);
  const sortedAndLimitedReviews = sortedReviews.slice(0, MAX_REVIEWS_COUNT);

  return (
    <ul className="reviews__list">
      {sortedAndLimitedReviews.map(({ id, date, user, comment, rating }) => (
        <ReviewItem
          key={id}
          date={formatDate(date)}
          user={user}
          comment={comment}
          rating={rating}
          id={id}
        />
      ))}
    </ul>
  );
});

ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
