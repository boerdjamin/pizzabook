import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import LabeledSelect, {
  LabeledSelectProps,
} from '../../components/labeled-select/labeled-select';
import LabeledTextInput, {
  LabeledTextInputProps,
} from '../../components/labeled-text-input/labeled-text-input';
import {
  filterBases,
  filterToppings,
  filterCheese,
  filterSauces,
  filterSpices,
} from '../../utils/food-types';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';

export enum InputType {
  TextInput,
  Select,
}

export interface InputItem {
  type: InputType;
  props: LabeledTextInputProps | LabeledSelectProps<any>;
}

export interface CreatePizzaForm {
  name: string;
  base: Ingridient[];
  toppings: Ingridient[];
  cheese: Ingridient[];
  sauces: Ingridient[];
  spices: Ingridient[];
  comment: string;
}

export const getOptions = (ingridients: Ingridient[]) => ({
  bases: filterBases(ingridients),
  toppings: filterToppings(ingridients),
  cheese: filterCheese(ingridients),
  sauces: filterSauces(ingridients),
  spices: filterSpices(ingridients),
});

export const renderCreatePizzaFormItem = ({
  item,
}: ListRenderItemInfo<InputItem>) => {
  switch (item.type) {
    case InputType.TextInput:
      return (
        <LabeledTextInput
          {...(item.props as LabeledTextInputProps)}
          style={{ marginBottom: Spacing.small }}
        />
      );
    case InputType.Select:
      return (
        <LabeledSelect
          {...(item.props as LabeledSelectProps<any>)}
          style={{ marginBottom: Spacing.small }}
        />
      );
    default:
      return null;
  }
};
