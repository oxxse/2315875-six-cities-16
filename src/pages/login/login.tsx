import Header from '../../components/header/header';
import LoginForm from '../../components/login-form/login-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute, BASE_ACTIVE_CITY, TIMEOUT_SHOW_ERROR, PASSWORD_REGEXP} from '../../const';
import { useRef, useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCity } from '../../store/active-main/active-main-selectors.ts';
import { loginAction } from '../../store/thunk-actions';
import { setError, clearError } from '../../store/error/error.ts';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(selectCity);
  const navigate = useNavigate();

  const handleFormSubmitLogin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const loginUser = async () => {
      if (loginRef.current !== null && passwordRef.current !== null) {
        const password = passwordRef.current.value;
        if (!PASSWORD_REGEXP.test(password)) {
          dispatch(setError('The password must contain a minimum of one letter and one number.'));
          setTimeout(() => {
            dispatch(clearError());
          }, TIMEOUT_SHOW_ERROR);
          return;
        }

        setIsSubmitting(true);
        try {
          await dispatch(loginAction({
            login: loginRef.current.value,
            password,
          })).unwrap();
          navigate(AppRoute.Main.replace(':selectedCity', BASE_ACTIVE_CITY));
        } catch {
          dispatch(setError('Something went wrong. Please check your connection and try again.'));
          setTimeout(() => {
            dispatch(clearError());
          }, TIMEOUT_SHOW_ERROR);
        }
        setIsSubmitting(true);
      }
    };

    loginUser();
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: Login</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm onSubmit={handleFormSubmitLogin} isSubmitting={isSubmitting} loginRef={loginRef} passwordRef={passwordRef} />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main.replace(':selectedCity', BASE_ACTIVE_CITY)}>
                <span>{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
