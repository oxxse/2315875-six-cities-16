import { FormEvent, memo } from 'react';

type LoginForm = {
  loginRef: React.MutableRefObject<HTMLInputElement | null>;
  passwordRef: React.MutableRefObject<HTMLInputElement | null>;
  isSubmitting: boolean;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
}

const LoginForm = memo(({ loginRef, passwordRef, isSubmitting, onSubmit }: LoginForm): JSX.Element => (
  <form onSubmit={onSubmit} className="login__form form" action="#" method="post">
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">E-mail</label>
      <input
        ref={loginRef}
        className="login__input form__input"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
    </div>
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">Password</label>
      <input className="login__input form__input"
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="Password"
        minLength={2}
        pattern='^.*(?=.*[a-zA-Z])(?=.*\d).*$'
        title='Пароль должен содержать минимум 1 букву и 1 цифру'
        required
      />
    </div>
    <button className="login__submit form__submit button" type="submit" disabled={isSubmitting} style={{ backgroundColor: isSubmitting ? 'grey' : '' }} > Sign in </button>
  </form >
));

LoginForm.displayName = 'LoginForm';

export default LoginForm;
