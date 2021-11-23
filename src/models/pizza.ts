import { ImageSourcePropType } from 'react-native';
import { Identifyable } from './identifyable';
import { Ingridient } from './ingridient';
import { User } from './user';

export interface Pizza extends Identifyable {
  readonly name: string;
  readonly toppings: Ingridient[];
  readonly isVegan: boolean;
  readonly createdBy: User | null;
  readonly photo: ImageSourcePropType | null;
  readonly canBeVeganized: boolean;
  readonly comment: string;
}
