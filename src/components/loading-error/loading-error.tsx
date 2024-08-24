import { useAppSelector } from '../../hooks';
import { selectError } from '../../store/error/error-selector';

function LoadingError(): JSX.Element {
  const errorMessage = useAppSelector(selectError);

  return (
    <div className='loading-error'>
      <p className='loading-error__title' >{errorMessage}</p>
    </div>
  );
}

export { LoadingError };
