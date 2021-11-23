import { Identifyable } from './identifyable';
import { FoodType } from './food-type';

export interface Ingridient {
  readonly name: string;
  readonly isVegan: boolean;
  readonly foodType: FoodType;
}

export type IIngridient = Ingridient & Identifyable;
