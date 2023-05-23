import { Identifyable } from './identifyable';
import { ImageSourcePropType } from 'react-native';

export interface AirtableUser extends Identifyable {
  readonly name: string;
  readonly picture?: ImageSourcePropType[];
  readonly pizzas?: string[];
}

export interface AirtablePizza extends Identifyable {
  readonly name: string;
  readonly toppings: string[];
  readonly is_vegan: boolean;
  readonly created_by?: string;
  readonly base?: string;
  readonly after_cooking?: string[];
  readonly photos?: ImageSourcePropType[];
  readonly can_be_veganized?: boolean;
  readonly comment?: string;
  readonly rating?: number;
  readonly recipes?: string[];
  readonly cooked_yet?: boolean;
  readonly users?: string;
}

export interface AirtableIngridient extends Identifyable {
  readonly name: string;
  readonly food_type: string[];
  readonly is_vegan?: boolean;
  readonly pizzas?: string[];
  readonly recipes?: string[];
}

export interface AirtableRecipe extends Identifyable {
  readonly name: string;
  readonly ingridients?: string[];
  readonly is_vegan?: boolean;
  readonly steps?: string[];
  readonly pizzas?: string[];
  readonly created_by?: string;
}

export interface AirtableFoodType extends Identifyable {
  readonly key: string;
  readonly ingridients?: string[];
}

export type AirtableObject =
  | AirtableIngridient
  | AirtablePizza
  | AirtableUser
  | AirtableFoodType;
