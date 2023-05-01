import { Pizza as IPizza } from '../models';

export enum TabsRoutes {
  Home = 'tabs.home',
  AddPizza = 'tabs.add_pizza',
  Profile = 'tabs.profile',
}

export type HomeStackParamList = {
  [HomeStackRoutes.Home]: undefined;
  [HomeStackRoutes.Details]: { pizza: IPizza };
};

export enum HomeStackRoutes {
  Home = 'stack.home',
  Details = 'stack.details',
}

export type ProfileStackParamList = {
  [ProfileStackRoutes.Main]: undefined;
  [ProfileStackRoutes.CreateUser]: undefined;
};

export enum ProfileStackRoutes {
  Main = 'profile.stack.main',
  CreateUser = 'profile.stack.create-user',
}

export type CreationStackParamList = {
  [CreationStackRoutes.Selection]: undefined;
  [CreationStackRoutes.Pizza]: undefined;
  [CreationStackRoutes.Ingridient]: { pizza?: IPizza } | undefined;
};

export enum CreationStackRoutes {
  Selection = 'creation.stack.selection',
  Pizza = 'creation.stack.pizza',
  Ingridient = 'creation.stack.ingridient',
}
