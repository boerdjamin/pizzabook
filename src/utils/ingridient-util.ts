import { AirtableIngridient } from '../models/airtable';
import { RequiredPropertyOf } from './types';

export const requiredIngridientKeys: Array<
  RequiredPropertyOf<AirtableIngridient>
> = ['name', 'food_type'];

export const ingridientKeys: Array<keyof AirtableIngridient> = [
  'name',
  'is_vegan',
  'food_type',
  'pizzas',
];

export const isIngridientFromDBValid = (
  val: AirtableIngridient | any,
): val is AirtableIngridient => {
  const possibleIngridient = val as AirtableIngridient;
  const keys = Object.keys(possibleIngridient);

  return (
    // has all required attributes
    requiredIngridientKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'Ingridient'
    keys.every(key => (ingridientKeys as string[]).includes(key))
  );
};
