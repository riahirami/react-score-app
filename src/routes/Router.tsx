import { useRoutes } from 'react-router-dom';
import RoutesConfig from 'routes/routes.config';

export function Router() {
  return useRoutes(
    RoutesConfig.map(({ path, element }) => ({
      path,
      element,
    })),
  );
}

export default Router;
