import { Identifyable } from './identifyable';
import { Ingridient } from './ingridient';
import { User } from './user';

export interface Recipe extends Identifyable {
  readonly name: string;
  readonly ingridients: Ingridient[];
  readonly isVegan: boolean;
  readonly createdBy: User | null;
  readonly steps: string[];
  readonly pizzaIds: string[];
}
