import { AirtableFoodType, EnumFoodType, Ingridient } from '../../models';

import { RequiredPropertyOf } from './types';

export const requiredFoodTypeKeys: Array<RequiredPropertyOf<AirtableFoodType>> =
  ['key'];

export const foodTypeKeys: Array<keyof AirtableFoodType> = [
  'key',
  'ingridients',
];

export const isFoodTypeFromDBValid = (
  val: AirtableFoodType | any,
): val is AirtableFoodType => {
  const possibleAirtableFoodType = val as AirtableFoodType;
  const keys = Object.keys(possibleAirtableFoodType);

  return (
    // has all required attributes
    requiredFoodTypeKeys.every(requiredKey => keys.includes(requiredKey)) &&
    // all attributes belong to interface 'AirtableFoodType'
    keys.every(key => (foodTypeKeys as string[]).includes(key))
  );
};

export const filterBases = (ingridients: Ingridient[]) =>
  ingridients.filter(i => i.foodType === EnumFoodType.base);
export const filterToppings = (ingridients: Ingridient[]) =>
  ingridients.filter(
    i =>
      i.foodType === EnumFoodType.fruit ||
      i.foodType === EnumFoodType.vegetable ||
      i.foodType === EnumFoodType.meatLike ||
      i.foodType === EnumFoodType.nut ||
      i.foodType === EnumFoodType.other,
  );
export const filterCheese = (ingridients: Ingridient[]) =>
  ingridients.filter(i => i.foodType === EnumFoodType.cheese);
export const filterSauces = (ingridients: Ingridient[]) =>
  ingridients.filter(i => i.foodType === EnumFoodType.additionalSauce);
export const filterSpices = (ingridients: Ingridient[]) =>
  ingridients.filter(i => i.foodType === EnumFoodType.spice);
