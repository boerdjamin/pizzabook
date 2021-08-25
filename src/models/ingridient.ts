import { FoodType } from './food-type';

export interface Ingridient {
  readonly name: string;
  readonly isVegan: boolean;
  readonly foodType?: FoodType;
}
