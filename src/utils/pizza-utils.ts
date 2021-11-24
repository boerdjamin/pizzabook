import { AirtablePizza } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredPizzaKeys: Array<RequiredPropertyOf<AirtablePizza>> = [
  'name',
  'toppings',
  'is_vegan',
  'created_by',
];

export const pizzaKeys: Array<keyof AirtablePizza> = [
  'name',
  'toppings',
  'is_vegan',
  'photos',
  'can_be_veganized',
  'comment',
  'created_by',
];

export const isPizzaFromDBValid = (
  val: AirtablePizza | any,
): val is AirtablePizza => {
  const possiblePizza = val as AirtablePizza;
  const keys = Object.keys(possiblePizza);

  return (
    // has all required attributes
    requiredPizzaKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'Pizza'
    keys.every(key => (pizzaKeys as string[]).includes(key))
  );
};
