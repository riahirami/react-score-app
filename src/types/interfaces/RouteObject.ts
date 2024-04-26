import { RouteIdEnum } from 'config/enums';
import { ReactElement } from 'react';

export default interface RouteObject {
  id?: number;
  path: RouteIdEnum;
  element?: ReactElement;
  children?: RouteObject[];
}
