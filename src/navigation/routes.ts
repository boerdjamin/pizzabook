import { Pizza } from '../models/pizza';

export enum TabsRoutes {
  Home = 'tabs.home',
  AddPizza = 'tabs.add_pizza',
  Profile = 'tabs.profile',
}

export type HomeStackParamList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Details]: { pizza: Pizza };
};

export enum HomeStackRoutes {
  Home = 'stack.home',
  Details = 'stack.details',
}

export type ProfileStackParamList = {
  [ProfileStackRoutes.Main]: undefined;
};

export enum ProfileStackRoutes {
  Main = 'profile.stack.main',
}
