import { Identifyable } from './identifyable';
import { ImageSourcePropType } from 'react-native';

export interface User extends Identifyable {
  readonly name: string;
  readonly picture: ImageSourcePropType | null;
  readonly pizzas: string[];
  readonly recipes: string[];
}
