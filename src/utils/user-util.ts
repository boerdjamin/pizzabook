import { User } from '../models/user';
import { RequiredPropertyOf } from './types';

export const requiredUserKeys: Array<RequiredPropertyOf<User>> = ['name'];

export const isUserFromDBValid = (val: User | any): val is User => {
  const possibleUser = val as User;
  const keys = Object.keys(possibleUser);

  // has all required attributes
  return (
    requiredUserKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'User'
    keys.every(attribute => (keys as string[]).includes(attribute))
  );
};
