import LoginForm from '../../components/login-form/login-form';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { useRef, FormEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/thunk-actions';
import { selectSubmittingStatus } from '../../store/user/user-selectors';
import { getRandomCity } from '../../utils/common';
import { toast } from 'react-toastify';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const isSubmitting = useAppSelector(selectSubmittingStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmitLogin = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current && passwordRef.current) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }))
        .unwrap()
        .then((response) => {
          if (response) {
            navigate(AppRoute.Main);
          }
        })
        .catch(() => {
          toast.warn('Ошибка авторизации');
        });
    }
  }, [dispatch, navigate]);

  return (
    <main className="page__main page__main--login">
      <Helmet>
        <title>6 cities: Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm isSubmitting={isSubmitting} onSubmit={handleFormSubmitLogin} loginRef={loginRef} passwordRef={passwordRef} />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={AppRoute.Main}>
              <span>{getRandomCity()}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginPage;
