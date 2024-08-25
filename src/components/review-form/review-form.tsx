import React, { ChangeEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { RATING_TITLES, ReviewLength, MAX_RATING_VALUE } from '../../const';
import { postComment } from '../../store/thunk-actions';
import { store } from '../../store';

type ReviewFormData = {
  offerId: string;
}

const ReviewForm = memo(({offerId}: ReviewFormData): JSX.Element => {
  const [submitButtonStatus, setSubmitButtonStatus] = useState(true);
  const [formDisableStatus, setFormDisableStatus] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    offerId: offerId
  });

  useEffect(() => {
    if (formData.rating > 0 && formData.comment.length >= ReviewLength.Min && formData.comment.length <= ReviewLength.Max) {
      setSubmitButtonStatus(false);
    } else {
      setSubmitButtonStatus(true);
    }
  }, [formData]);

  const handleRaitingChange = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
    if (target.tagName === 'INPUT') {
      setFormData({...formData, rating: parseInt(target.value, 10)});
    }
  }, [formData]);

  const handleReviewChange = useCallback(({target}: ChangeEvent<HTMLTextAreaElement>) => {
    if (target.tagName === 'TEXTAREA') {
      setFormData({...formData, comment: target.value});
    }
  }, [formData]);

  const handleDisableForm = useCallback((status: boolean) => {
    if (status) {
      setFormData({
        rating: 0,
        comment: '',
        offerId: offerId
      });
      form.current?.reset();
    } else {
      setSubmitButtonStatus(false);
    }
    setFormDisableStatus(false);
  }, [offerId]);

  const handleFormSubmit = useCallback((evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSubmitButtonStatus(true);
    setFormDisableStatus(true);
    store.dispatch(postComment({...formData, disableForm: (status: boolean) => handleDisableForm(status)}));
  }, [formData, handleDisableForm]);

  return (
    <form ref={form} className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={handleRaitingChange}>
        {
          Array.from({ length: MAX_RATING_VALUE}, (_, i: number) => i + 1).reverse().map((item, index) => (
            <React.Fragment key={`raiting-${item}`}>
              <input className="form__rating-input visually-hidden" name="rating" value={ item } id={`${ item }-stars`} type="radio" disabled={formDisableStatus} />
              <label htmlFor={(formDisableStatus) ? '' : `${ item }-stars`} className="reviews__rating-label form__rating-label" title={RATING_TITLES[index]}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>)
          )
        }
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" onChange={handleReviewChange} disabled={formDisableStatus}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={submitButtonStatus}>Submit</button>
      </div>
    </form>
  );
});

ReviewForm.displayName = 'ReviewForm';

export default ReviewForm;
