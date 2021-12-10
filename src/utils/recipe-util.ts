import { AirtableRecipe } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredRecipeKeys: Array<RequiredPropertyOf<AirtableRecipe>> = [
  'name',
  'ingridients',
];

export const RecipeKeys: Array<keyof AirtableRecipe> = [
  'name',
  'steps',
  'is_vegan',
  'ingridients',
  'pizzas',
  'created_by',
];

export const isRecipeFromDBValid = (
  val: AirtableRecipe | any,
): val is AirtableRecipe => {
  const possibleRecipe = val as AirtableRecipe;
  const keys = Object.keys(possibleRecipe);

  return (
    // has all required attributes
    requiredRecipeKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'Recipe'
    keys.every(key => (RecipeKeys as string[]).includes(key))
  );
};
