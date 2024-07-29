import { Review } from '../../types/types.ts';
import { getMarkupRating } from '../../utils/common.ts';

type ReviewsList = {
  reviews: Review[];
}

function ReviewsItem({ date, user, comment, rating }: Review): JSX.Element {
  const reviewDate = new Date(date);
  const humanDate = reviewDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  const computerDate = date.toString().slice(0, 10);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={getMarkupRating(rating)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={computerDate}>
          {humanDate}
        </time>
      </div>
    </li>
  );
}

function ReviewsList({ reviews }: ReviewsList): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map(({ id, date, user, comment, rating }) => (
        <ReviewsItem
          key={id}
          {...{ id, date, user, comment, rating }}
        />
      ))}
    </ul>
  );
}

export default ReviewsList;

