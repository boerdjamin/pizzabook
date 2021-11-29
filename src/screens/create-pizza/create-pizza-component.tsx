import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BigButton from '../../components/big-button/big-button';
import { appTexts } from '../../data/texts';
import { Ingridient } from '../../models/ingridient';
import { Spacing } from '../../styles';
import commonStyles from '../../styles/common';
import { doNothing } from '../../utils/placeholder';
import {
  CreatePizzaForm,
  getOptions,
  InputItem,
  InputType,
  renderCreatePizzaFormItem,
} from './create-pizza-utils';

interface CreatePizzaComponentProps {
  readonly ingridients: Ingridient[];
}

const CreatePizzaComponent = ({ ingridients }: CreatePizzaComponentProps) => {
  const [form, setForm] = useState<CreatePizzaForm>({
    name: '',
    base: [],
    toppings: [],
    cheese: [],
    sauces: [],
    spices: [],
    comment: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    const isValid =
      form.name.length > 0 && form.base.length > 0 && form.toppings.length > 0;
    setIsFormValid(isValid);
  }, [form]);

  const { name, base, toppings, cheese, sauces, spices, comment } = form;
  const options = getOptions(ingridients);

  const onTypeName = (value: string) =>
    setForm(prevState => ({ ...prevState, name: value }));
  const onTypeComment = (value: string) =>
    setForm(prevState => ({ ...prevState, comment: value }));
  const onSelectBase = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, base: selection }));
  const onSelectToppings = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, toppings: selection }));
  const onSelectCheese = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, cheese: selection }));
  const onSelectSauces = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, sauces: selection }));
  const onSelectSpices = (selection: Ingridient[]) =>
    setForm(prevState => ({ ...prevState, spices: selection }));

  const inputList: InputItem[] = [
    {
      type: InputType.TextInput,
      props: {
        label: appTexts.create_pizza_name_label,
        value: name,
        onType: onTypeName,
      },
    },
    {
      type: InputType.Select,
      props: {
        label: appTexts.create_pizza_base_label,
        selectedItems: base,
        onSelect: onSelectBase,
        options: options.bases,
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
        options: options.toppings,
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
        options: options.cheese,
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
        options: options.sauces,
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
        options: options.spices,
        placeholder:
          spices.length === 0 ? appTexts.create_pizza_spices_placeholder : '',
      },
    },
    {
      type: InputType.TextInput,
      props: {
        label: appTexts.create_pizza_comment_label,
        value: comment,
        onType: onTypeComment,
        numberOfLines: 3,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={inputList}
        renderItem={renderCreatePizzaFormItem}
        ListFooterComponent={
          <BigButton
            label={appTexts.create_pizza_submit_button}
            onPress={doNothing}
            style={styles.button}
            disabled={!isFormValid}
          />
        }
      />
    </View>
  );
};

export default CreatePizzaComponent;

const styles = StyleSheet.create({
  container: { ...commonStyles.screen },
  marginBottom: { marginBottom: Spacing.small },
  button: { width: '100%', marginTop: Spacing.large },
});
