import { ImageSourcePropType } from 'react-native';
import { Identifyable } from './identifyable';

export interface Pizza {
  readonly name: string;
  readonly toppingIds: string[];
  readonly isVegan: boolean;
  readonly photo?: ImageSourcePropType;
  readonly canBeVeganized?: boolean;
  readonly comment?: string;
  readonly createdBy?: string;
}

export type IPizza = Pizza & Identifyable;
