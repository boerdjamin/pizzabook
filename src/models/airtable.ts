import { Identifyable } from './identifyable';
import { ImageSourcePropType } from 'react-native';

export interface AirtableUser extends Identifyable {
  readonly name: string;
  readonly pizzas?: string[];
}

export interface AirtablePizza extends Identifyable {
  readonly name: string;
  readonly toppings: string[];
  readonly is_vegan: boolean;
  readonly created_by: string;
  readonly photo?: ImageSourcePropType;
  readonly can_be_veganized?: boolean;
  readonly comment?: string;
}

export interface AirtableIngridient extends Identifyable {
  readonly name: string;
  readonly food_type: string;
  readonly is_vegan?: boolean;
  readonly pizzas?: string[];
}

export interface AirtableFoodType extends Identifyable {
  readonly name: string;
  readonly ingridients?: string[];
}

export type AirtableData =
  | AirtableIngridient
  | AirtablePizza
  | AirtableUser
  | AirtableFoodType;
