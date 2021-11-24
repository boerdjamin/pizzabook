import { Pizza } from '../models/pizza';

export type HomeStackParamList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Details]: { pizza: Pizza };
};

export enum HomeStackRoutes {
  Home = 'stack.home',
  Details = 'stack.details',
}

export enum TabsRoutes {
  Home = 'tabs.home',
  AddPizza = 'tabs.add_pizza',
  Profile = 'tabs.profile',
}
