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
  'rating',
  'recipes',
];
