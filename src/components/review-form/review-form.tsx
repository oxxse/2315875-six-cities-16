import { ReactEventHandler, ChangeEvent, useState, FormEvent, memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ReviewLength, RATING_TITLES } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { postComment } from '../../store/thunk-actions.ts';
import { selectCommentPostingErrorStatus, selectCommentPostingStatus } from '../../store/offers/offers-selectors.ts';
import { CommentForm } from '../../types/types.ts';
import { toast } from 'react-toastify';

type StarsRatingData = {
  value: string;
  title: string;
  checkedValue: number;
  onInputChange: ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  disabled: boolean;
}

const StarsRating = memo(({ value, title, checkedValue, disabled, onInputChange }: StarsRatingData): JSX.Element => (
  <>
    <input
      className="form__rating-input visually-hidden"
      name="rating"
      value={value}
      id={`${value}-stars`}
      type="radio"
      onChange={onInputChange}
      checked={checkedValue === Number(value)}
      disabled={disabled}
    />
    <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
));

StarsRating.displayName = 'StarsRating';

const ReviewForm = memo((): JSX.Element => {
  const { id: offerId } = useParams();
  const isPosting = useAppSelector(selectCommentPostingStatus);
  const isPostingError = useAppSelector(selectCommentPostingErrorStatus);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<CommentForm>({
    rating: 0,
    comment: ''
  });

  const handleRaitingChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.tagName === 'INPUT') {
      setFormData({ ...formData, rating: parseInt(target.value, 10) });
    }
  }, [formData]);

  const handleReviewChange = useCallback(({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    if (target.tagName === 'TEXTAREA') {
      setFormData({ ...formData, comment: target.value });
    }
  }, [formData]);

  const handleFormSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (offerId) {
      dispatch(postComment({
        id: offerId,
        comment: formData
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            setFormData({
              rating: 0,
              comment: ''
            });
          }
        });
    }
  }, [dispatch, formData, offerId]);

  const isSubmitButtonDisabled = isPosting || formData.rating === 0 || formData.comment.length < ReviewLength.Min || formData.comment.length > ReviewLength.Max;

  if (isPostingError) {
    toast.error('Возникла ошибка при отправке отзыва');
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(RATING_TITLES).map(([rate, title]) => <StarsRating value={rate} title={title} key={title} onInputChange={handleRaitingChange} checkedValue={formData.rating} disabled={isPosting} />).reverse()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        value={formData.comment}
        disabled={isPosting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewLength.Min} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitButtonDisabled}>Submit</button>
      </div>
    </form>
  );
});

ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;
