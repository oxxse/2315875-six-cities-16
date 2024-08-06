import { useState, ChangeEvent } from 'react';
import { ReviewLengths } from '../../const';

type RatingStar = {
  id: string;
  ratingValue: number;
  title: string;
  onChange: () => void;
  checked: boolean;
};

function RatingStar({ id, ratingValue, title, onChange, checked }: RatingStar): JSX.Element {
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

function ReviewForm(): JSX.Element {
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const minLength : number = ReviewLengths.MinLength;
  const maxLength : number = ReviewLengths.MaxLength;

  const isValid: boolean = review.length >= minLength && review.length <= maxLength && rating !== 0;
  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your
          stay with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
