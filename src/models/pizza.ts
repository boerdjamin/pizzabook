import { Identifyable } from './identifyable';
import { ImageSourcePropType } from 'react-native';
import { Ingridient } from './ingridient';
import { Recipe } from './recipe';
import { User } from './user';

export interface Pizza extends Identifyable {
  readonly name: string;
  readonly toppings: (Ingridient | Recipe)[];
  readonly isVegan: boolean;
  readonly createdBy: User | null;
  readonly photo: ImageSourcePropType | null;
  readonly canBeVeganized: boolean;
  readonly comment: string;
}
