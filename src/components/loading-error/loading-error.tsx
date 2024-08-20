import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectError } from '../../store/error/error-selector';
import { fetchOffersAction } from '../../store/thunk-actions';

function LoadingError(): JSX.Element {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(selectError);

  return (
    <div className='error-screen'>
      <p>{errorMessage}</p>
      <button type='button' onClick={() => {
        dispatch(fetchOffersAction());
      }}
      >Попробовать ещё раз
      </button>

    </div>
  );
}

export { LoadingError };
