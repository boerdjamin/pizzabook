import { ImageSourcePropType } from 'react-native';
import { Ingridient } from './ingridient';

export interface Pizza {
  readonly name: string;
  readonly toppings: Ingridient[];
  readonly isVegan: boolean;
  readonly photo?: ImageSourcePropType;
  readonly canBeVeganized?: boolean;
}
