import { ImageSourcePropType } from 'react-native';
import { Identifyable } from './identifyable';
export interface User extends Identifyable {
  readonly name: string;
  readonly picture: ImageSourcePropType | null;
  readonly pizzas: string[];
  readonly recipes: string[];
}
