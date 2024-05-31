import { RouteIdEnum } from 'config/enums';
import MainLayout from 'layouts/mainLayout/MainLayout';
import GameScreen from 'pages/GameScreen/Screen/GameScreen/GameScreen';
import GameScreenPreview from 'pages/GameScreen/Screen/GameScreenPreview/GameScreenPreview';
import JoinGame from 'pages/GameScreen/Screen/JoinGame/JoinGame';
import { ListGames } from 'pages/GameScreen/Screen/ListGames/ListGames';
import Home from 'pages/GameSettings/Screen/Home';
import NotFoundPage from 'pages/NotFoundPage';
import RouteObject from 'types/interfaces/RouteObject';

const RoutesConfig: RouteObject[] = [
  {
    path: RouteIdEnum.Root,
    element: <Home />,
  },
  {
    path: RouteIdEnum.Any,
    element: <NotFoundPage />,
  },
  {
    path: RouteIdEnum.GameScreenPreview,
    element: (
      <MainLayout>
        <GameScreenPreview />
      </MainLayout>
    ),
  },
  {
    path: RouteIdEnum.GameScreen,
    element: (
      <MainLayout>
        <GameScreen />
      </MainLayout>
    ),
  },
  {
    path: RouteIdEnum.ListGames,
    element: (
      <MainLayout>
        <ListGames />
      </MainLayout>
    ),
  },
  {
    path: RouteIdEnum.JoinGame,
    element: (
      <MainLayout>
        <JoinGame />
      </MainLayout>
    ),
  },
];
export default RoutesConfig;
