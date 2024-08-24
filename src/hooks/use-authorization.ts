import { useAppSelector } from '.';
import { AuthorizationStatus } from '../const';
import { selectAuthorizationStatus } from '../store/user/user-selectors';

export const useAuthorization = () => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth;
};
