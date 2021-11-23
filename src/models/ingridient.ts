import { Identifyable } from './identifyable';
import { EnumFoodType } from './food-type';
export interface Ingridient extends Identifyable {
  readonly name: string;
  readonly isVegan: boolean;
  readonly foodType: EnumFoodType;
  readonly pizzaIds: string[];
}
