import { ReactNode } from 'react';
import { AppRoute, BASE_ACTIVE_CITY } from '../../const';
import { Navigate } from 'react-router-dom';

export type AuthStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

type AccessRoute = {
  children: ReactNode;
  status: AuthStatus;
}

type AppRouteData = string;

const createAccessRoute = (statusToCheck: AuthStatus, fallbackPath: AppRouteData) =>
  function AccessRoute({children, status} : AccessRoute) {
    switch (status) {
      case statusToCheck:
        return children;
      case 'UNKNOWN':
        return 'Loading...';
      default:
        return <Navigate to={fallbackPath} />;
    }
  };

const PrivateRoute = createAccessRoute('AUTH', AppRoute.Login);
const PublicRoute = createAccessRoute('NO_AUTH', AppRoute.Main.replace(':selectedCity', BASE_ACTIVE_CITY));

export {PrivateRoute, PublicRoute};
