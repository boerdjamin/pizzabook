import { AirtableIngridient } from '../../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredIngridientKeys: Array<
  RequiredPropertyOf<AirtableIngridient>
> = ['name', 'food_type'];

export const ingridientKeys: Array<keyof AirtableIngridient> = [
  'name',
  'is_vegan',
  'food_type',
  'pizzas',
  'recipes',
];
