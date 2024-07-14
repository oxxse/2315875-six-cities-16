import { ReactNode } from 'react';
import { AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';

export type AuthStatus = 'AUTH' | 'NO_AUTH' | 'UNKNOWN';

type AccessRouteProps = {
  children: ReactNode;
  status: AuthStatus;
}

const createAccessRoute = (statusToCheck: AuthStatus, fallbackPath: AppRoute) =>
  function AccessRoute({children, status} : AccessRouteProps) {
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
const PublicRoute = createAccessRoute('NO_AUTH', AppRoute.Main);

export {PrivateRoute, PublicRoute};
