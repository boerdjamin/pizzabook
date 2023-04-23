import { Ingridient, EnumFoodType, AirtableFoodType } from '../models';
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

export const mapTypeIdToEnum = (key: string): EnumFoodType => {
  switch (key) {
    case EnumFoodType.additionalSauce:
      return EnumFoodType.additionalSauce;
    case EnumFoodType.base:
      return EnumFoodType.base;
    case EnumFoodType.cheese:
      return EnumFoodType.cheese;
    case EnumFoodType.condiment:
      return EnumFoodType.condiment;
    case EnumFoodType.fruit:
      return EnumFoodType.fruit;
    case EnumFoodType.meatLike:
      return EnumFoodType.meatLike;
    case EnumFoodType.nut:
      return EnumFoodType.nut;
    case EnumFoodType.spice:
      return EnumFoodType.spice;
    case EnumFoodType.vegetable:
      return EnumFoodType.vegetable;
    case EnumFoodType.other:
    default:
      return EnumFoodType.other;
  }
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
