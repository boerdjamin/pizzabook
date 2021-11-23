import { Pizza } from '../models/pizza';

export type RootStackParamList = {
  [RootRoutes.Home]: undefined;
  [RootRoutes.Details]: { pizza: Pizza };
};

export enum RootRoutes {
  Home = 'stack.home',
  Details = 'stack.details',
}
