import { useState, ChangeEvent, FormEvent } from 'react';
import { ReviewLengths, RATING_TITLES, TIMEOUT_SHOW_ERROR } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setError } from '../../store/error/error';
import { fetchOfferComments, postComment } from '../../store/thunk-actions';

type RatingStar = {
  id: string;
  ratingValue: number;
  title: string;
  onChange: () => void;
  checked: boolean;
  disabled: boolean;
};

function RatingStar({disabled, id, ratingValue, title, onChange, checked }: RatingStar): JSX.Element {
  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        defaultValue={ratingValue}
        id={id}
        type="radio"
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width={37} height={33}>
          <use xlinkHref="#icon-star" />
        </svg>
      </label>
    </>
  );
}

function ReviewForm({ offerId }: { offerId: string }): JSX.Element {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const minLength: number = ReviewLengths.MinLength;
  const maxLength: number = ReviewLengths.MaxLength;

  const isValid: boolean = review.length >= minLength && review.length <= maxLength && rating !== 0;

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isValid) {
      setIsSubmitting(true);
      dispatch(postComment({ offerId, commentText: review, rating }))
        .unwrap()
        .then(() => {
          setReview('');
          setRating(0);
          dispatch(fetchOfferComments(offerId));
        })
        .catch(() => {
          dispatch(setError('Failed to post comment. Please try again later.'));
          setTimeout(() => {
            dispatch(setError(null));
          }, TIMEOUT_SHOW_ERROR);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_TITLES.map((title, index) => {
          const ratingValue = 5 - index;
          return (
            <RatingStar
              key={ratingValue}
              id={`${ratingValue}-stars`}
              ratingValue={ratingValue}
              title={title}
              onChange={() => handleRatingChange(ratingValue)}
              checked={rating === ratingValue}
              disabled={isSubmitting}
            />
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleTextareaChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
          stay with at least{' '}
          <b className="reviews__text-amount">{minLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
