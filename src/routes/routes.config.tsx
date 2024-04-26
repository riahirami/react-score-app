import { RouteIdEnum } from 'config/enums';
import RouteObject from 'types/interfaces/RouteObject';
import NotFoundPage from 'pages/NotFoundPage';
import GameSettings from 'pages/GameSettings/Screen/GameSettings';

const RoutesConfig: RouteObject[] = [
  {
    path: RouteIdEnum.Game,
    element: <GameSettings />,
  },
  {
    path: RouteIdEnum.Any,
    element: <NotFoundPage />,
  },
];
export default RoutesConfig;
