import { ImageSourcePropType } from 'react-native';

export interface Pizza {
  readonly id: string;
  readonly name: string;
  readonly toppingIds: string[];
  readonly isVegan: boolean;
  readonly photo?: ImageSourcePropType;
  readonly canBeVeganized?: boolean;
  readonly comment?: string;
  readonly createdBy?: string;
}
