import { Identifyable } from './identifyable';

export enum EnumFoodType {
  base = 'BASE',
  vegetable = 'VEGETABLE',
  fruit = 'FRUIT',
  cheese = 'CHEESE',
  meatLike = 'MEAT_LIKE',
  nut = 'NUT',
  spice = 'SPICE',
  additionalSauce = 'ADDITIONAL_SAUCE',
  other = 'OTHER',
}

export interface FoodType extends Identifyable {
  type: EnumFoodType;
  ingridientIds: string[];
}
