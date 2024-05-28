import { FC, PropsWithChildren, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@fms/web-services';

export const AuthProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [isAuthenticated] = useIsAuthenticated();
  const Location = useLocation();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: Location }} replace />;
  } else {
    return <>{children}</>;
  }
};

export const GuestProvider: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [isAuthenticated] = useIsAuthenticated();
  const Location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: Location }} replace />;
  } else {
    return <>{children}</>;
  }
};
