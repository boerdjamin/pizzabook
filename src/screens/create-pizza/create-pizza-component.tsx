import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BigButton from '../../components/big-button/big-button';
import LabeledSelect, {
  LabeledSelectProps,
} from '../../components/labeled-select/labeled-select';
import LabeledTextInput, {
  LabeledTextInputProps,
} from '../../components/labeled-text-input/labeled-text-input';
import { appTexts } from '../../data/texts';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';
import commonStyles from '../../styles/common';
import {
  filterBases,
  filterCheese,
  filterSauces,
  filterSpices,
  filterToppings,
} from '../../utils/food-types';
import { doNothing } from '../../utils/placeholder';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
}

const CreatePizzaComponent = ({ ingridients }: CreatePizzaComponentProps) => {
  const [name, setName] = useState('');
  const [base, setBase] = useState<Ingridient[]>([]);
  const [toppings, setToppings] = useState<Ingridient[]>([]);
  const [cheese, setCheese] = useState<Ingridient[]>([]);
  const [sauces, setSauces] = useState<Ingridient[]>([]);
  const [spices, setSpices] = useState<Ingridient[]>([]);
  const [comment, setComment] = useState('');

  const baseOptions = filterBases(ingridients);
  const toppingOptions = filterToppings(ingridients);
  const cheeseOptions = filterCheese(ingridients);
  const sauceOptions = filterSauces(ingridients);
  const spiceOptions = filterSpices(ingridients);

  const onSelectBase = (selection: Ingridient[]) => setBase(selection);
  const onSelectToppings = (selection: Ingridient[]) => setToppings(selection);
  const onSelectCheese = (selection: Ingridient[]) => setCheese(selection);
  const onSelectSauces = (selection: Ingridient[]) => setSauces(selection);
  const onSelectSpices = (selection: Ingridient[]) => setSpices(selection);

  enum InputType {
    TextInput,
    Select,
  }
  interface InputItem {
    type: InputType;
    props: LabeledTextInputProps | LabeledSelectProps<any>;
  }

  const inputList: InputItem[] = [
    {
      type: InputType.TextInput,
      props: {
        label: appTexts.create_pizza_name_label,
        value: name,
        onType: setName,
        style: styles.marginBottom,
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_base_label,
        selectedItems: base,
        onSelect: onSelectBase,
        options: baseOptions,
        placeholder: appTexts.create_pizza_base_placeholder,
        mode: 'single',
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_toppings_label,
        selectedItems: toppings,
        onSelect: onSelectToppings,
        options: toppingOptions,
        placeholder:
          toppings.length === 0
            ? appTexts.create_pizza_toppings_placeholder
            : '',
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_cheese_label,
        selectedItems: cheese,
        onSelect: onSelectCheese,
        options: cheeseOptions,
        placeholder:
          cheese.length === 0 ? appTexts.create_pizza_cheese_placeholder : '',
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_sauce_label,
        selectedItems: sauces,
        onSelect: onSelectSauces,
        options: sauceOptions,
        placeholder:
          sauces.length === 0 ? appTexts.create_pizza_sauce_placeholder : '',
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_spices_label,
        selectedItems: spices,
        onSelect: onSelectSpices,
        options: spiceOptions,
        placeholder:
          spices.length === 0 ? appTexts.create_pizza_spices_placeholder : '',
      },
    },
    {
      type: InputType.TextInput,
      props: {
        label: appTexts.create_pizza_comment_label,
        value: comment,
        onType: setComment,
        numberOfLines: 3,
      },
    },
  ];

  const renderItem = ({ item }: ListRenderItemInfo<InputItem>) => {
    switch (item.type) {
      case InputType.TextInput:
        return (
          <LabeledTextInput
            {...(item.props as LabeledTextInputProps)}
            style={styles.marginBottom}
          />
        );
      case InputType.Select:
        return (
          <LabeledSelect
            {...(item.props as LabeledSelectProps<any>)}
            style={styles.marginBottom}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inputList}
        renderItem={renderItem}
        ListFooterComponent={<BigButton label={'submit'} onPress={doNothing} />}
      />
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  marginBottom: { marginBottom: Spacing.small },
});
