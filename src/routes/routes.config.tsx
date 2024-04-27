import { RouteIdEnum } from 'config/enums';
import GameSettings from 'pages/GameSettings/Screen/GameSettings';
import NotFoundPage from 'pages/NotFoundPage';
import RouteObject from 'types/interfaces/RouteObject';

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
