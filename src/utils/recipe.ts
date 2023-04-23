import { AirtableRecipe } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredRecipeKeys: Array<RequiredPropertyOf<AirtableRecipe>> = [
  'name',
];

export const recipeKeys: Array<keyof AirtableRecipe> = [
  'name',
  'steps',
  'is_vegan',
  'ingridients',
  'pizzas',
  'created_by',
];
