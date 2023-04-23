import { AirtablePizza } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredPizzaKeys: Array<RequiredPropertyOf<AirtablePizza>> = [
  'name',
  'toppings',
  'is_vegan',
];

export const pizzaKeys: Array<keyof AirtablePizza> = [
  'name',
  'toppings',
  'is_vegan',
  'base',
  'after_cooking',
  'cooked_yet',
  'users',
  'photos',
  'can_be_veganized',
  'comment',
  'created_by',
  'rating',
  'recipes',
];
