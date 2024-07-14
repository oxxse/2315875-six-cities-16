import { useNavigate } from 'react-router-dom';
import './not-found.module.css';

export default function NotFound() {
  const navigate = useNavigate();
  const back = () => navigate(-1);

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Page Not Found</p>
      <button type="button" onClick={back} className="not-found__button">
        Go Back
      </button>
    </section>
  );
}
