import { Identifyable } from './identifyable';
export interface User extends Identifyable {
  readonly name: string;
  readonly pizzas: string[];
}
