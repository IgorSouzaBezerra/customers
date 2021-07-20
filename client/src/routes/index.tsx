import { useAuth } from '../contexts/AuthContext';

import { SignRoutes } from './SignRoutes';
import { OtherRoutes } from './OtherRoutes';

export function Routes() {
  const { signed } = useAuth();

  return signed ? <SignRoutes /> : <OtherRoutes />;
};
