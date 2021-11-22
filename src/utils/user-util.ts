import { User } from '../models/user';
import { RequiredPropertyOf } from './types';

export const requiredUserKeys: Array<RequiredPropertyOf<User>> = ['id', 'name'];

export const isValidUser = (val: User | any): val is User => {
  const possiblePizza = val as User;
  const keys = Object.keys(possiblePizza);

  return requiredUserKeys.sort() === keys.sort();
};
