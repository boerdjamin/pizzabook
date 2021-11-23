import { Identifyable } from './identifyable';
import { FoodType } from './food-type';
export interface Ingridient extends Identifyable {
  readonly name: string;
  readonly isVegan: boolean;
  readonly foodType: FoodType;
  readonly pizzaIds: string[];
}
