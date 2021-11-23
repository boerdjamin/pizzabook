import { Ingridient } from '../models/ingridient';
import { RequiredPropertyOf } from './types';

export const requiredIngridientKeys: Array<RequiredPropertyOf<Ingridient>> = [
  'name',
  'isVegan',
  'foodType',
];

export const ingridientKeys: Array<keyof Ingridient> = [
  'name',
  'isVegan',
  'foodType',
];

export const isIngridientFromDBValid = (
  val: Ingridient | any,
): val is Ingridient => {
  const possibleIngridient = val as Ingridient;
  const keys = Object.keys(possibleIngridient);

  return (
    // has all required attributes
    requiredIngridientKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'Ingridient'
    keys.every(attribute => (ingridientKeys as string[]).includes(attribute))
  );
};
