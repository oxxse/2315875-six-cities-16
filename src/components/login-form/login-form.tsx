import { useState } from 'react';
import { ChangeEvent } from 'react';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  return (
    <form className="login__form form" action="#" method="post">
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default LoginForm;
