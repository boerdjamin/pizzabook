import { Pizza } from '../models/pizza';
import { RequiredPropertyOf } from './types';

export const requiredPizzaKeys: Array<RequiredPropertyOf<Pizza>> = [
  'id',
  'name',
  'toppingIds',
  'isVegan',
];

export const pizzaKeys: Array<keyof Pizza> = [
  'id',
  'name',
  'toppingIds',
  'isVegan',
  'photo',
  'canBeVeganized',
  'comment',
  'createdBy',
];

export const isValidPizza = (val: Pizza | any): val is Pizza => {
  const possiblePizza = val as Pizza;
  const keys = Object.keys(possiblePizza);

  return (
    // has all required attributes
    requiredPizzaKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'Pizza'
    keys.every(attribute => (pizzaKeys as string[]).includes(attribute))
  );
};
